export const defferCall = (func: any, timeout: number = 500, args: any = {}) => {
  return new Promise(resolve => {
    setTimeout(
      () => {
        func(args);
        resolve();
      },
      timeout,
    );
  });
}
