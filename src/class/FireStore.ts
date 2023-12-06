// Import the functions you need from the SDKs you need
import { FirebaseApp } from 'firebase/app';
import {
	DocumentData,
	Firestore,
	doc,
	getDocs,
	getFirestore,
	collection,
	addDoc,
	setDoc,
} from 'firebase/firestore';
import app from 'src/Firebase';

class FireStore {
	db: Firestore;

	constructor(app: FirebaseApp) {
		this.db = getFirestore(app);
	}

	// 문서 구조는 예림 -> 카테고리 -> quiz(컬렉션), field에 카테고리 추가 하는 방식으로 진행하겠음.
	async addData(collectionId: string, path: string, data: DocumentData) {
		try {
			await addDoc(collection(this.db, collectionId, path, 'quiz'), data);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	// 카테고리들을 반환하는 메서드
	async getCategories(collectionId: string) {
		const querySnapshot = await getDocs(collection(this.db, collectionId));
		const categories: string[] = [];

		querySnapshot.forEach((doc) => {
			const data = doc.data();
			categories.push(data.category);
		});

		return categories;
	}

	// 카테고리를 등록하는 메서드
	async addCategory(collectionId: string, category: string) {
		await setDoc(doc(this.db, collectionId, category), { category });
	}
}

export default new FireStore(app);
