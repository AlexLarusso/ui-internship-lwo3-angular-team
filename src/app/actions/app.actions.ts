import { createAction, props } from '@ngrx/store';

import App from '../app.model';

export const buttonDisable = createAction('[JoinUs] disable button');

export const setScores = createAction('[Scoreboard Page] Set Scores', props<{}>());