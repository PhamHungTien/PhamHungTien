import type { ImgHTMLAttributes } from 'react';
import { responsiveImages } from '../data/responsiveImages.generated';

/** Native browser selection avoids downloading desktop screenshots on phones. */
export function ResponsiveImage({
  src,
  sizes = '(max-width: 700px) 90vw, 560px',
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const image = src ? responsiveImages[src] : undefined;
  return (
    <img
      {...props}
      src={image?.src ?? src}
      srcSet={image?.srcSet}
      sizes={image ? sizes : undefined}
      width={props.width ?? image?.width}
      height={props.height ?? image?.height}
      decoding={props.decoding ?? 'async'}
    />
  );
}
