export const concatIsbn = (isbn: string) => {
  return isbn.replace(/\s/g, "-");
}

export const deConcatIsbn = (isbn: string) => {
  return isbn.split("-")[0];
  // return isbn.replace(/-/g, " ");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR');
}