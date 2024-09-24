export type File = Express.Multer.File;

export class DocumentsDTO {
  passport: File;
  employmentContract: File;
  resume: File;
}
