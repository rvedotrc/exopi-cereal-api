import type { CerealWithID } from "@lib/schema/api/cereal";
import type { Cereal } from "@lib/schema/db/cereal";
import { CEREAL_TYPE_NAMES, type CerealType } from "@lib/schema/db/cerealType";
import { MFR_NAMES, type MfrCode } from "@lib/schema/db/mfrCode";
import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";
import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
} from "@mui/x-data-grid";
import type { Dispatch, SetStateAction } from "react";

const columns: GridColDef<CerealWithID>[] = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "name",
    headerName: "Name",
    width: 220,
    editable: false,
  },
  {
    field: "mfr",
    headerName: "Manufacturer",
    width: 130,
    editable: false,
    renderCell: (t) => MFR_NAMES[t.row.mfr as MfrCode],
  },
  {
    field: "type",
    headerName: "Type",
    width: 50,
    editable: false,
    renderCell: (a) => CEREAL_TYPE_NAMES[a.row.type as CerealType],
  },
  {
    field: "calories",
    headerName: "kCal",
    type: "number",
    width: 60,
    editable: false,
    description: "kCalories per serving",
    renderCell: (t) => (
      <span title={`${t.row.calories} kCal per serving`}>{t.row.calories}</span>
    ),
  },
  {
    field: "protein",
    headerName: "Protein",
    type: "number",
    width: 80,
    editable: false,
    description: "grams of protein",
    renderCell: (t) => (
      <span title={`${t.row.protein}g protein`}>{t.row.protein}g</span>
    ),
  },
  {
    field: "fat",
    headerName: "Fat",
    type: "number",
    width: 50,
    editable: false,
    description: "grams of fat",
    renderCell: (t) => <span title={`${t.row.fat}g fat`}>{t.row.fat}g</span>,
  },
  {
    field: "sodium",
    headerName: "Sodium",
    type: "number",
    width: 80,
    editable: false,
    description: "milligrams of Sodium",
    renderCell: (t) => (
      <span title={`${t.row.sodium}mg Sodium`}>{t.row.sodium}mg</span>
    ),
  },
  {
    field: "fiber",
    headerName: "Fibre",
    type: "number",
    width: 60,
    editable: false,
    description: "grams of dietary fibre",
    renderCell: (t) => (
      <span title={`${t.row.fiber}g fiber`}>{t.row.fiber}g</span>
    ),
  },
  {
    field: "carbo",
    headerName: "Carbo",
    type: "number",
    width: 60,
    editable: false,
    description: "grams of complex carbohydrates",
    renderCell: (t) => (
      <span title={`${t.row.carbo}g complex carbohydrates`}>
        {t.row.carbo}g
      </span>
    ),
  },
  {
    field: "sugars",
    headerName: "Sugars",
    type: "number",
    width: 80,
    editable: false,
    description: "grams of sugars",
    renderCell: (t) => (
      <span title={`${t.row.carbo}g sugars`}>{t.row.sugars}g</span>
    ),
  },
  {
    field: "potass",
    headerName: "Potassium",
    type: "number",
    width: 90,
    editable: false,
    description: "milligrams of Potassium",
    renderCell: (t) => (
      <span title={`${t.row.potass}mg Potassium`}>{t.row.potass}mg</span>
    ),
  },
  {
    field: "vitamins",
    headerName: "Vitamins",
    type: "number",
    width: 80,
    editable: false,
    description:
      "vitamins and minerals - 0, 25, or 100, indicating the typical percentage of FDA recommended",
    renderCell: (t) => (
      <span title={`${t.row.vitamins}% FDA RDA`}>{t.row.vitamins}%</span>
    ),
  },
  {
    field: "shelf",
    headerName: "Shelf",
    type: "number",
    width: 60,
    editable: false,
    description: "display shelf (1, 2, or 3, counting from the floor)",
  },
  {
    field: "weight",
    headerName: "Weight",
    type: "number",
    width: 70,
    editable: false,
    description: "weight in ounces of one serving",
    renderCell: (t) => <>{t.row.weight} oz</>,
  },
  {
    field: "cups",
    headerName: "Cups",
    type: "number",
    width: 60,
    editable: false,
    description: "number of cups in one serving",
    //   renderCell: (t) => <>{t.row.cups}/>,
  },
  {
    field: "rating",
    headerName: "Rating",
    type: "number",
    width: 150,
    editable: false,
    description: "a rating of the cereals (Possibly from Consumer Reports?)",
    renderCell: (t) => (
      <Rating
        value={(t.row.rating / 100) * 5.0}
        max={5.0}
        precision={0.25}
        readOnly
      />
    ),
  },
] as const;

const initialVisibility: Record<(typeof columns)[number]["field"], boolean> =
  {};
for (const f of columns) {
  initialVisibility[f.field] = ![
    "id",
    "sodium",
    "potass",
    "vitamins",
    "shelf",
    "weight",
    "cups",
  ].includes(f.field);
}

export default function AllItems({
  rows,
  setEditDrawerOpenFor,
}: {
  rows: readonly Cereal[] | undefined;
  setEditDrawerOpenFor: Dispatch<SetStateAction<Cereal | undefined>>;
}) {
  if (!rows) {
    return (
      <CircularProgress
        aria-label="Loading…"
        sx={{ marginInline: "auto", marginBlockStart: "40vh" }}
      />
    );
  }

  return (
    <DataGrid
      sx={{ marginInline: "auto", marginBlock: "2em" }}
      rows={rows}
      columns={columns}
      initialState={{
        columns: {
          columnVisibilityModel: initialVisibility,
        },
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
      showToolbar
      onRowClick={(t, _e, _details) => {
        const { row } = t as GridRowParams<Cereal>;
        setEditDrawerOpenFor(row);
      }}
    />
  );
}
