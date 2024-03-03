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
	getDocs,
	deleteDoc,
	QueryFieldFilterConstraint,
	and,
} from 'firebase/firestore';
import { app } from './Firebase';

interface DocumentPathParams {
	path?: string;
	lastId?: string;
}
interface AddDocumentParams extends DocumentPathParams {
	data: DocumentData;
	merge?: boolean;
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

	async addDocumentData({
		path = '',
		lastId = '',
		merge = false,
		data,
	}: AddDocumentParams) {
		try {
			if (lastId.length !== 0) {
				await setDoc(doc(this.db, `${path}`, lastId), data, { merge });
			} else {
				await addDoc(collection(this.db, `${path}`), data);
			}
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	// document의 정보를 얻는 메서드
	async getDocumentInfos(path: string) {
		const categorySnapShot = await getDoc(doc(this.db, `${path}`));

		if (!categorySnapShot.exists())
			throw new Error('해당 경로에 맞는 데이터가 없습니다.');

		return categorySnapShot.data();
	}

	async getQuerySnapShot(
		path: string,
		queryConstraints: QueryFieldFilterConstraint[]
	) {
		const docRef = collection(this.db, `${path}`);

		const currentQuery = query(docRef, and(...queryConstraints));

		const querySnapshot = await getDocs(currentQuery);

		return querySnapshot;
	}

	async updateDocumentData(path: string, updateData: DocumentData) {
		const docRef = doc(this.db, path);

		const currentData = await this.getDocumentInfos(`${path}`);

		const updatedData = { ...currentData, ...updateData };

		setDoc(docRef, updatedData, { merge: true });
	}

	async deleteDocument(path: string) {
		const document = doc(this.db, `${path}`);

		await deleteDoc(document);
	}
}

export default new FireStore(app);
