// Import the functions you need from the SDKs you need
import { FirebaseApp } from 'firebase/app';
import {
	DocumentData,
	Firestore,
	doc,
	getFirestore,
	collection,
	setDoc,
	getDoc,
	query,
	addDoc,
	QueryConstraint,
	getDocs,
} from 'firebase/firestore';
import app from './Firebase';

interface DocumentPathParams {
	collectionId: string;
	path?: string;
	lastId?: string;
}
interface AddDocumentParams extends DocumentPathParams {
	data: DocumentData;
}

class FireStore {
	private db: Firestore;

	constructor(app: FirebaseApp) {
		this.db = getFirestore(app);

		this.addDocumentData = this.addDocumentData.bind(this);
		this.getDocumentInfos = this.getDocumentInfos.bind(this);
		this.getQuerySnapShot = this.getQuerySnapShot.bind(this);
		this.updateDocumentData = this.updateDocumentData.bind(this);
	}

	// 기존에 있던 데이터에 값을 추가하는 메서드. id가 존재하는 경우 무작위 id를 할당하고 그게 아니라면 기본 값을 할당한다.
	async addDocumentData({
		collectionId,
		path = '',
		lastId = '',
		data,
	}: AddDocumentParams) {
		try {
			if (lastId.length !== 0) {
				await setDoc(doc(this.db, collectionId, path, lastId), data);
			} else {
				await addDoc(collection(this.db, collectionId, path), data);
			}
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	// document의 정보를 얻는 메서드
	async getDocumentInfos(collectionId: string, path: string) {
		const categorySnapShot = await getDoc(doc(this.db, collectionId, path));

		return categorySnapShot.data();
	}

	async getQuerySnapShot(
		collectionId: string,
		path: string,
		queryConstraints: QueryConstraint[]
	) {
		const docRef = collection(this.db, collectionId, path);

		const currentQuery = query(docRef, ...queryConstraints);

		const querySnapshot = await getDocs(currentQuery);

		return querySnapshot;
	}

	// Document를 업데이트 하는 메서드
	async updateDocumentData(
		collectionId: string,
		path: string,
		updateData: DocumentData
	) {
		const docRef = doc(this.db, collectionId, path);

		const currentData = await this.getDocumentInfos(collectionId, path);

		const updatedData = { ...currentData, ...updateData };

		setDoc(docRef, updatedData, { merge: true });
	}
}

export default new FireStore(app);
