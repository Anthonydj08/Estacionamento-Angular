import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(public db: AngularFireDatabase) { }


  listAndWatch<Type>(path: string): Observable<Type[]> {
    return this.db.list<Type>(path).valueChanges();
  }

  list<Type>(path: string): Promise<Type[]> {
    return new Promise<Type[]>((resolve, reject) => {
      this.db.list<Type>(path)
        .valueChanges()
        .subscribe(
          result => resolve(result),
          error => reject(error)
        );
    });
  }

  search<Type>(path: string, filterProprety: string, filterValue: any): Promise<Type[]> {
    return new Promise<Type[]>((resolve, reject) => {
      this.db.list<Type>(path, ref => ref.orderByChild(filterProprety).equalTo(filterValue))
        .snapshotChanges()
        .subscribe(
          itens => {
            const typedItems: Type[] = [];

            itens.forEach(item => {
              const typedItem: Type = item.payload.val();
              typedItem['uid'] = item.key;
              typedItems.push(typedItem);
            });
            resolve(typedItems);
          },
          error => reject(error)
        );
    });
  }

  listWithUIDs<Type>(path: string): Promise<Type[]> {
    return new Promise<Type[]>((resolve, reject) => {
      this.db.list<Type>(path)
        .snapshotChanges()
        .subscribe(
          items => {
            const typedItems: Type[] = [];

            items.forEach(item => {
              const typedItem: Type = item.payload.val();
              typedItem['uid'] = item.key;
              typedItems.push(typedItem);
            });

            resolve(typedItems);
          },
          error => reject(error)
        );
    });
  }

  getObject<Type>(path: string): Promise<Type> {
    return new Promise<Type>((resolve, reject) => {
      this.db.object<Type>(path)
        .valueChanges()
        .subscribe(
          result => resolve(result),
          error => reject(error)
        );
    });
  }

  getObjectAndWatch<Type>(path: string): Observable<Type> {
    return this.db.object<Type>(path).valueChanges();
  }

  insert<Type>(path: string, object: Type): Promise<void> {
    return this.db.object<Type>(path)
      .set(object);
  }

  insertInList<Type>(path: string, object: Type): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.db.list<Type>(path)
        .push(object)
        .then(item => resolve(item.key));
    });
  }

  update(path: string, uid, object): Promise<void> {
    return this.db.object(path + '/' + uid).update(object);
  }
  
  remove(path: string, uid: string): Promise<void> {
    return this.db.object(path + '/' + uid).remove();
  }
}