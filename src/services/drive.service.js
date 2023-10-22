import { Readable } from 'stream';
import drive from '../configs/drive.config';

export const executeQuery = async (query, fields = 'files(id, name)') => {
  const response = await drive.files.list({ q: query, fields });
  return response.data.files;
};

export const createFolder = async (productName) => {
  const files = await executeQuery(
    `name='${productName}' and mimeType='application/vnd.google-apps.folder' and '${process.env.FOLDER_DRIVE_ID}' in parents`,
  );

  if (files.length) {
    return files[0].id;
  }

  const folderMetadata = {
    name: productName,
    mimeType: 'application/vnd.google-apps.folder',
    parents: [process.env.FOLDER_DRIVE_ID],
  };

  const { data: folder } = await drive.files.create({ resource: folderMetadata, fields: 'id' });

  return folder.id;
};

export const getFolderId = async (productName) => {
  const files = await executeQuery(
    `name='${productName}' and mimeType='application/vnd.google-apps.folder' and '${process.env.FOLDER_DRIVE_ID}' in parents`,
  );

  return files.length ? files[0].id : null;
};

export const uploads = async (productName, files) => {
  const folderId = (await getFolderId(productName)) || (await createFolder(productName));

  await Promise.all(
    files.map((file) =>
      drive.files.create({
        resource: { name: `${productName} (${Date.now()})`, parents: [folderId] },
        media: { mimeType: file.mimetype, body: Readable.from(file.buffer) },
        fields: 'id',
      }),
    ),
  );

  return `https://drive.google.com/drive/folders/${folderId}`;
};

export const trashItem = (fileId, trashed = true) => {
  return drive.files.update({ fileId, resource: { trashed } });
};

export const manageImages = async (folderId, trashFolder = false) => {
  const files = await executeQuery(`'${folderId}' in parents`);

  await Promise.all(files.map(({ id }) => trashItem(id)));

  if (trashFolder && folderId !== process.env.FOLDER_DRIVE_ID) {
    await trashItem(folderId);
  }
};
