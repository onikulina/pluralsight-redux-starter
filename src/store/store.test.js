import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

// functionality to add/ edit/ delete authors
// functionality to delete a course - hide empty course list
// message to user if tries to leave course form with unsaved changes
// client side validation
// handle 404's
// pagination
// sort course table alpha - map state to props
// revert abanoned changes
// check react + flux

describe('Store', () => {
    it('should handle creating courses', () => {
        const store = createStore(rootReducer, initialState);
        const course = {
            title: 'Clean Code'
        };

        const action = courseActions.createCourseSuccess(course); // can dispatch additional actions
        store.dispatch(action);

        const actual = store.getState().courses[0];
        const expected = {
            title: 'Clean Code'
        };

        expect(actual).toEqual(expected);
    });
});