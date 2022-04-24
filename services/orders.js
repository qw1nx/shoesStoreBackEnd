

async function create(item) {
    const result = new Item(item);
    await result.save();

    return result;
}