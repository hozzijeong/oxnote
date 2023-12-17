// Import the functions you need from the SDKs you need
import { FirebaseApp } from 'firebase/app';
import {
	DocumentData,
	Firestore,
	doc,
	getDocs,
	getFirestore,
	collection,
	setDoc,
	getDoc,
} from 'firebase/firestore';
import app from './Firebase';

class FireStore {
	private db: Firestore;

	constructor(app: FirebaseApp) {
		this.db = getFirestore(app);

		this.addDocumentData = this.addDocumentData.bind(this);
		this.getDocumentInfos = this.getDocumentInfos.bind(this);
		this.getCategoryQuizList = this.getCategoryQuizList.bind(this);
		this.getQuizDoc = this.getQuizDoc.bind(this);
		this.updateQuizData = this.updateQuizData.bind(this);
	}

	// document에 데이터를 추가하는 메서드
	async addDocumentData(
		collectionId = 'yerim',
		path: string,
		data: DocumentData | string
	) {
		try {
			const date = Date.now();
			const quizSnapShot = await this.getDocumentInfos(collectionId, path);

			const quizDocument = doc(this.db, collectionId, path);

			await setDoc(quizDocument, {
				...quizSnapShot,
				[date]: typeof data === 'string' ? data : { ...data },
			});
		} catch (e) {
			console.error('Error adding document: ', e);
		}
	}

	// document의 정보를 얻는 메서드
	async getDocumentInfos(collectionId = 'yerim', docId: string) {
		const categorySnapShot = await getDoc(doc(this.db, collectionId, docId));

		return categorySnapShot.data();
	}

	// 퀴즈 리스트 전체를 받는 메서드
	async getCategoryQuizList(collectionId = 'yerim', category: string) {
		const collectionRef = collection(this.db, collectionId, category, 'quiz');

		const quizList = await getDocs(collectionRef);

		return quizList;
	}

	// 단일 퀴즈 데이터를 받는 메서드
	async getQuizDoc(collectionId = 'yerim', category: string, quizId: string) {
		const docRef = doc(this.db, collectionId, category, 'quiz', quizId);

		const curDoc = await getDoc(docRef);

		if (!curDoc.exists()) throw new Error('존재하지 않는 문제입니다.');

		return curDoc;
	}

	// 단일 퀴즈 데이터를 업데이트 하는 메서드
	async updateQuizData(
		collectionId = 'yerim',
		category: string,
		quizId: string,
		updateData: DocumentData
	) {
		const docRef = doc(this.db, collectionId, category, 'quiz', quizId);

		const quizDoc = await getDoc(docRef);

		if (!quizDoc.exists()) throw new Error('존재하지 않는 문제입니다.');

		const quizData = quizDoc.data();

		const updatedData = { ...quizData, ...updateData };

		setDoc(docRef, updatedData, { merge: true });
	}
}

export default new FireStore(app);
