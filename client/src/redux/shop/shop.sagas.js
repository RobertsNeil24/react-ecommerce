import { takeEvery, call, all, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnaphotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';
import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions';

export function* fetchCollectionsAsync() {
   yield console.log('Triggered');


   try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnaphotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));
   } catch (error) {
        yield put(fetchCollectionFailure(error.message));
   }
}

export function* fetchCollectionsStart() {
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync 
    );
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ]);
}
