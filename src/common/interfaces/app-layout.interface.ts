import IAppContainer from './app-container.interface';

export default interface IAppLayout extends IAppContainer {
  showFooter?: boolean;
  showHeader?: boolean;
}
