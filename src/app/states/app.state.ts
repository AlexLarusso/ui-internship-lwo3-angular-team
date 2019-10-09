import App from '../app.model';

export default class AppState {
    Apps: Array<App>;
  }

  export const initializeState = () => {
    return { Apps: Array<App>() };
  };