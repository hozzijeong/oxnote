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
import app from './Firebase';

class FireStore {
	db: Firestore;

	constructor(app: FirebaseApp) {
		this.db = getFirestore(app);
	}

	// 문서 구조는 예림 -> 카테고리 -> quyerimiz(컬렉션), field에 카테고리 추가 하는 방식으로 진행하겠음.
	async addData(collectionId = '', category: string, data: DocumentData) {
		console.log(category, collectionId);
		try {
			await addDoc(collection(this.db, collectionId, category, 'quiz'), data);
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	// 카테고리들을 반환하는 메서드
	async getDocInfos(collectionId = 'yerim') {
		const infos: DocumentData[] = [];

		const categorySnapShot = await getDocs(collection(this.db, collectionId));
		categorySnapShot.forEach((doc) => {
			const data = doc.data();
			infos.push(data);
		});

		return infos;
	}

	// 카테고리를 등록하는 메서드
	async addCategory(collectionId = 'yerim', category: string) {
		const date = Date.now();
		await setDoc(doc(this.db, collectionId, category), {
			name: category,
			id: date,
		});
	}
}

export default new FireStore(app);
