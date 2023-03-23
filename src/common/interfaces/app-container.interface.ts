export default interface IAppContainer {
  children: JSX.Element | JSX.Element[];
  container?: `fluid` | `xxl` | `xl` | `lg` | `md` | `sm`;
}
