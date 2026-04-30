import { currentUser } from "@lib/auth";
import AppDataSource from "@lib/dataSource";
import { Cereal } from "@lib/schema/db/cereal";
import { type NextRequest, NextResponse } from "next/server";
import { isValid } from "ulid";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> => {
  const user = await currentUser(req);
  if (!user)
    return NextResponse.json(
      { error: "Authorization required" },
      { status: 401 },
    );

  const p = await params;

  if (!isValid(p.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await AppDataSource.manager.delete(Cereal, { id: p.id });
  // -> .affected = count of rows affected

  return new NextResponse(null, { status: 204 });
};
