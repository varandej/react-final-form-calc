
declare module '*.svg' {
  type TSvgComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;

  const el: string;

  export const ReactComponent: TSvgComponent;
  export default el;
}
