import { Injectable } from '@angular/core';
import { Firestore, OrderByDirection, addDoc, collection, collectionData, doc, docData, getDoc, getDocs, orderBy, query, setDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestor: Firestore) { }
  
  docRef(path){
    return doc(this.firestor,path);
  }

  collectionRef(path) {
    return collection(this.firestor, path)
  }
  

  setDocument(path,data) {
    const dataRef = this.docRef(path);
    return setDoc(dataRef,data); //set()
  }

   addDocument(path,data){
    const dataRef = this.collectionRef(path);
    return addDoc(dataRef, data);
  }

  getDocById(path){
    const dataRef = this.docRef(path);
    return getDoc(dataRef);
  }

  getDocs(path , queryFn?){
    let dataRef: any = this.collectionRef(path);
    if(queryFn) {
      const q = query(dataRef,queryFn);
      dataRef = q;
    }
    return getDocs(dataRef);
  }

  collectionDataQuery(path, queryFn?){
    let dataRef: any = this.collectionRef(path);
    if(queryFn) {
      const q = query(dataRef,queryFn);
      dataRef = q ;
    }
   const collection_data = collectionData<any>(dataRef, {idField: 'id'});
    return collection_data;
  }

  docDataQuery(path, id? ,queryFn?){
    let dataRef: any = this.docRef(path);
    if(queryFn) {
      const q = query(dataRef,queryFn);
      dataRef = q ;
    }
    let doc_data;
    if(id) doc_data = docData<any>(dataRef, {idField:'id'});
    else doc_data = docData<any>(dataRef);
    return doc_data;

  }

  whereQuery(fieldPath,condition,value) {
    return where(fieldPath,condition,value);
  }

  orderByQuery(fieldPath, directionStr: OrderByDirection = 'asc'){
    return orderBy(fieldPath, directionStr);
}

}
