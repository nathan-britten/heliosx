export function createConsultation(data: { [key: string]: string }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data);
      resolve({ data });
    }, 3000);
  });
}
