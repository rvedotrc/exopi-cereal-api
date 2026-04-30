import AppDataSource from "@lib/dataSource";
import type { CerealWithID } from "@lib/schema/api/cereal";
import { Cereal } from "@lib/schema/db/cereal";
import { NextResponse } from "next/server";

const doUpdateOrNotFound = async (item: CerealWithID) => {
  const dbItem = await AppDataSource.manager.findOne(Cereal, {
    where: { id: item.id },
  });

  if (!dbItem) {
    return NextResponse.json({ error: "No such item" }, { status: 404 });
  }

  item = {
    ...item,
    id: dbItem.id,
  };

  await AppDataSource.manager.update(Cereal, { id: dbItem.id }, item);

  return NextResponse.json(
    { id: item.id },
    {
      status: 303,
      headers: [["Location", `http://localhost:7835/api/cereals/${item.id}`]],
    },
  );
};

export default doUpdateOrNotFound;
