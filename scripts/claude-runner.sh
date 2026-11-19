#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# claude-runner.sh — lets Claude run commands on this Mac, with your full
# Terminal environment (PATH, node/nvm, git, firebase, network, Chrome...).
#
# Start it from Terminal (keeps the Mac awake while it runs):
#   cd ~/Documents/PhamHungTien && caffeinate -dimsu bash scripts/claude-runner.sh
# Stop it: Ctrl+C (or Claude drops a file named STOP into the inbox).
#
# Protocol (all inside .claude-runner/, which is git-ignored):
#   inbox/<id>.sh     job written by Claude; must end with the line  #__END__
#                     optional header line:  # timeout: <seconds>  (default 1800)
#   running/<id>.sh   job currently executing
#   outbox/<id>.log   live stdout+stderr of the job
#   outbox/<id>.exit  exit code, written last (= job finished)
#   done/<id>.sh      finished jobs
#   heartbeat         unix time, refreshed every second while the runner lives
#   runner.env        snapshot of the environment the runner started with
# Jobs run in parallel, each in its own process group, with cwd = repo root.
# Written for macOS's stock bash 3.2.
# ---------------------------------------------------------------------------
set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
Q="$ROOT/.claude-runner"
mkdir -p "$Q/inbox" "$Q/running" "$Q/outbox" "$Q/done"
rm -f "$Q/inbox/STOP"

c_dim=$'\033[2m'; c_grn=$'\033[32m'; c_red=$'\033[31m'; c_cyn=$'\033[36m'; c_off=$'\033[0m'
ts() { date '+%H:%M:%S'; }
say() { printf '%s[%s]%s %s\n' "$c_dim" "$(ts)" "$c_off" "$*"; }

# --- environment snapshot so Claude can see what it is working with --------
{
  echo "started=$(date '+%Y-%m-%d %H:%M:%S %z')"
  echo "pid=$$"
  echo "root=$ROOT"
  echo "user=$(id -un)"
  echo "macos=$(sw_vers -productVersion 2>/dev/null || uname -sr)"
  echo "arch=$(uname -m)"
  echo "shell=${SHELL:-}"
  echo "node=$(node -v 2>/dev/null || echo missing)"
  echo "npm=$(npm -v 2>/dev/null || echo missing)"
  echo "git=$(git --version 2>/dev/null || echo missing)"
  echo "firebase=$(npx --no-install firebase --version 2>/dev/null || command -v firebase || echo missing)"
  echo "chrome=$([ -d '/Applications/Google Chrome.app' ] && echo yes || echo no)"
  echo "PATH=$PATH"
} >"$Q/runner.env" 2>/dev/null

want_node="$(tr -d ' v\n' 2>/dev/null <"$ROOT/.nvmrc" || true)"
have_node="$(node -v 2>/dev/null | tr -d 'v')"
if [ -z "$have_node" ]; then
  say "${c_red}node not found in PATH — open a Terminal where 'node -v' works, then start again.${c_off}"
elif [ -n "$want_node" ] && [ "${have_node%%.*}" != "${want_node%%.*}" ]; then
  say "${c_red}warning:${c_off} node v$have_node, but .nvmrc wants $want_node (run 'nvm use' first if builds fail)"
fi

# kill a process and all of its descendants (no job control needed)
kill_tree() {
  local p="$1" sig="${2:-TERM}" c
  for c in $(pgrep -P "$p" 2>/dev/null); do kill_tree "$c" "$sig"; done
  kill "-$sig" "$p" 2>/dev/null
}

cleanup() {
  say "stopping runner…"
  for f in "$Q"/running/*.pid; do
    [ -e "$f" ] || continue
    kill_tree "$(cat "$f")"
  done
  rm -f "$Q/heartbeat"
  exit 0
}
trap cleanup INT TERM

run_job() {
  local id="$1" f="$Q/running/$1.sh" log="$Q/outbox/$1.log"
  local limit start code pid wd
  limit="$(grep -m1 -E '^#[[:space:]]*timeout:' "$f" | tr -cd '0-9')"
  [ -n "$limit" ] || limit=1800
  start=$(date +%s)
  say "${c_cyn}▶ $id${c_off} ${c_dim}(timeout ${limit}s)${c_off}"

  (cd "$ROOT" && exec bash "$f") >"$log" 2>&1 </dev/null &
  pid=$!
  echo "$pid" >"$Q/running/$id.pid"
  (sleep "$limit"; echo "[claude-runner] timeout after ${limit}s — killing job" >>"$log"
   kill_tree "$pid" TERM; sleep 5; kill_tree "$pid" KILL) &
  wd=$!

  wait "$pid"; code=$?
  kill_tree "$wd"
  echo "$code" >"$Q/outbox/$id.exit.tmp" && mv -f "$Q/outbox/$id.exit.tmp" "$Q/outbox/$id.exit"
  mv -f "$f" "$Q/done/$id.sh"; rm -f "$Q/running/$id.pid"

  local dur=$(( $(date +%s) - start ))
  if [ "$code" -eq 0 ]; then say "${c_grn}✔ $id${c_off} ${c_dim}${dur}s${c_off}"
  else say "${c_red}✘ $id exit $code${c_off} ${c_dim}${dur}s${c_off}"; fi
}

say "${c_grn}Claude runner ready${c_off} — $ROOT"
say "node $(node -v 2>/dev/null) · Ctrl+C to stop"

while :; do
  date +%s >"$Q/heartbeat"
  [ -e "$Q/inbox/STOP" ] && { rm -f "$Q/inbox/STOP"; cleanup; }
  for job in "$Q"/inbox/*.sh; do
    [ -e "$job" ] || continue
    # only run files that were written completely
    tail -n 1 "$job" 2>/dev/null | grep -q '#__END__' || continue
    id="$(basename "$job" .sh)"
    mv -f "$job" "$Q/running/$id.sh" || continue
    rm -f "$Q/outbox/$id.log" "$Q/outbox/$id.exit"
    run_job "$id" &
  done
  sleep 1
done
