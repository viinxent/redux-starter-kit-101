import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import uuid from 'uuid';

import { ITask, IUpdateTaskActionPayload } from 'store/reducers/task';

export const TASK_POUCH_DB = 'task';

PouchDB.plugin(PouchDBFind);

let taskPouchDb: PouchDB.Database<ITask> | null = null;

export const getTaskPouchDb = () => {
  if (!taskPouchDb) taskPouchDb = new PouchDB(TASK_POUCH_DB);
  return taskPouchDb;
};

export const createTaskService = async (name: string): Promise<ITask> => {
  const db = getTaskPouchDb();
  const data: ITask = {
    name,
    _id: uuid.v4(),
    done: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  const resData = await db.post(data);
  data._rev = resData.rev;

  return data;
};

export const fetchTaskService = async (id: string) => {
  const db = getTaskPouchDb();
  const data = await db.get(id);
  return data;
};

export const updateTaskService = async (
  data: IUpdateTaskActionPayload
): Promise<ITask> => {
  const db = getTaskPouchDb();
  const currData = await db.get(data._id);
  const newData = { ...currData, ...data, updatedAt: Date.now() };
  const resData = await db.put(newData);
  newData._rev = resData.rev;
  return newData;
};

export const removeTaskService = async (id: string): Promise<ITask> => {
  const db = getTaskPouchDb();
  const currData = await db.get(id);
  const delData = { ...currData, _deleted: true };
  const resData = await db.put(delData);
  delData._rev = resData.rev;
  return delData;
};

export const fetchTasksService = async () => {
  const db = getTaskPouchDb();
  const { rows } = await db.allDocs({ include_docs: true });
  return rows.map(row => row.doc);
};

export const searchTaskService = async (search: string) => {
  const db = getTaskPouchDb();
  const { docs } = await db.find({
    selector: {
      name: {
        $regex: search
      }
    }
  });

  return docs;
};
