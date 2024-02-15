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

	// 기존에 있던 데이터에 값을 추가하는 메서드. id가 존재하는 경우 무작위 id를 할당하고 그게 아니라면 기본 값을 할당한다.
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

		if (categorySnapShot.exists()) {
			return categorySnapShot.data();
		}

		throw new Error('해당 경로에 맞는 데이터가 없습니다.');
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

	// Document를 업데이트 하는 메서드
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
