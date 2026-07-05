const createError = (message: string, label: number, e:unknown) => {
    const now = new Date();
    console.error(
    `label=${label}, ${now.toISOString()}
       \t${message}
       \t${e}
    `)
}

export { createError }