declare module 'dom-to-image-more' {
  type Filter = (node: HTMLElement) => boolean

  interface Options {
    filter?: Filter
    bgcolor?: string
    width?: number
    height?: number
    style?: Record<string, string>
    quality?: number
    cacheBust?: boolean
    imagePlaceholder?: string
    pixelRatio?: number
  }

  export function toPng(node: HTMLElement, options?: Options): Promise<string>
  export function toJpeg(
    node: HTMLElement,
    options?: Options & { quality?: number }
  ): Promise<string>
  export function toSvg(node: HTMLElement, options?: Options): Promise<string>
  export function toBlob(node: HTMLElement, options?: Options): Promise<Blob>
  export function toPixelData(
    node: HTMLElement,
    options?: Options
  ): Promise<Uint8Array>
}
