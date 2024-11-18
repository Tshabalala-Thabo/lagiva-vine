export const up = async (db, client) => {
    await db.collection("products").updateMany({}, { $set: { published: false } });

};

export const down = async (db, client) => {
    await db.collection("products").updateMany({}, { $unset: { published: "" } });

};
