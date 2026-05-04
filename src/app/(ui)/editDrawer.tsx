import type { Cereal } from "@lib/schema/db/cereal";
import { CEREAL_TYPE_NAMES } from "@lib/schema/db/cerealType";
import { MFR_NAMES } from "@lib/schema/db/mfrCode";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { type Dispatch, useState } from "react";

import styles from "./editDrawer.module.css";
import NumberField from "./NumberField";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "start",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  boxShadow: "none",
}));

function IntField({
  label,
  value,
  units,
  onChange,
}: {
  label: string;
  value: bigint;
  units?: string;
  onChange?: Dispatch<bigint>;
}) {
  return (
    <>
      <Grid size={6}>
        <Item>{label}</Item>
      </Grid>
      <Grid size={6}>
        <NumberField
          label={units}
          min={-1}
          max={1000}
          value={Number(value)}
          onValueChange={(n) => (n === null ? null : onChange?.(BigInt(n)))}
          size="small"
        />
      </Grid>
    </>
  );
}

function FloatField({
  label,
  value,
  units,
  onChange,
}: {
  label: string;
  value: number;
  units?: string;
  onChange?: Dispatch<number>;
}) {
  return (
    <>
      <Grid size={6}>
        <Item>{label}</Item>
      </Grid>
      <Grid size={6}>
        <NumberField
          label={units}
          min={-1}
          max={1000}
          value={Number(value)}
          onValueChange={(n) => (n === null ? null : onChange?.(n))}
          size="small"
        />
      </Grid>
    </>
  );
}

export default function EditDrawer({
  item: x,
  onClose,
}: {
  item: Cereal;
  onClose: Dispatch<void>;
}) {
  const [data, setData] = useState(x);

  return (
    <Stack sx={{ width: "40vw", padding: "2em" }}>
      <Grid className={styles.dataGrid} container spacing={2}>
        {/* <Grid size={3}>
          <Item>ID</Item>
        </Grid>
        <Grid size={9}>
          <Item>{item.id}</Item>
        </Grid> */}

        <Grid size={3}>
          <Item>Name</Item>
        </Grid>
        <Grid size={9}>
          <Input
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            fullWidth
          />
        </Grid>

        <Grid size={3}>
          <Item>Manufacturer</Item>
        </Grid>
        <Grid size={9}>
          <Select
            value={data.mfr}
            onChange={(e) => setData({ ...data, mfr: e.target.value })}
            size="small"
          >
            {Object.entries(MFR_NAMES).map(([k, v]) => (
              <MenuItem key={k} value={k}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid size={3}>
          <Item>Type</Item>
        </Grid>
        <Grid size={9}>
          <Select
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
            size="small"
          >
            {Object.entries(CEREAL_TYPE_NAMES).map(([k, v]) => (
              <MenuItem key={k} value={k}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid size={12} />

        <Grid size={6} container>
          <IntField
            value={BigInt(data.calories)}
            onChange={(n) => setData({ ...data, calories: Number(n) })}
            label="Calories"
            units="kCal"
          />
          <IntField
            value={BigInt(data.protein)}
            onChange={(n) => setData({ ...data, protein: Number(n) })}
            label="Protein"
            units="grams"
          />
          <IntField
            value={BigInt(data.fat)}
            onChange={(n) => setData({ ...data, fat: Number(n) })}
            label="Fat"
            units="grams"
          />

          <FloatField
            value={data.fiber}
            onChange={(n) => setData({ ...data, fiber: n })}
            label="Fibre"
            units="grams"
          />
          <FloatField
            value={data.carbo}
            onChange={(n) => setData({ ...data, carbo: n })}
            label="Carbs"
            units="grams"
          />
          <IntField
            value={BigInt(data.sugars)}
            onChange={(n) => setData({ ...data, sugars: Number(n) })}
            label="Sugars"
            units="grams"
          />
        </Grid>

        <Grid className={styles.secondColumn} size={6} container>
          <IntField
            value={BigInt(data.sodium)}
            onChange={(n) => setData({ ...data, sodium: Number(n) })}
            label="Sodium"
            units="milligrams"
          />
          <IntField
            value={BigInt(data.potass)}
            onChange={(n) => setData({ ...data, potass: Number(n) })}
            label="Potassium"
            units="milligrams"
          />
          <IntField
            value={BigInt(data.vitamins)}
            onChange={(n) => setData({ ...data, vitamins: Number(n) })}
            label="Vitamins"
            units="% of RDA"
          />
          <IntField
            value={BigInt(data.shelf)}
            onChange={(n) => setData({ ...data, shelf: Number(n) })}
            label="Shelf"
          />

          <FloatField
            value={data.weight}
            onChange={(n) => setData({ ...data, weight: n })}
            label="Weight"
            units="ounces"
          />
          <FloatField
            value={data.cups}
            onChange={(n) => setData({ ...data, cups: n })}
            label="Cups"
          />
        </Grid>

        <Grid size={12} />

        <Grid size={6} container>
          <FloatField
            value={data.rating}
            onChange={(n) => setData({ ...data, rating: Number(n) })}
            label="Rating"
          />
        </Grid>
        <Grid size={6}>
          <Rating
            value={data.rating / 20}
            onChange={(_e, n) =>
              n === null ? null : setData({ ...data, rating: n * 20 })
            }
            max={5}
            precision={0.05}
            size="large"
          />
        </Grid>
      </Grid>

      <Container sx={{ marginBlockStart: "2em", width: "auto" }}>
        <Stack direction={"row"} spacing={6}>
          <Button variant="contained" color="primary" onClick={() => onClose()}>
            Update
          </Button>
          <Button variant="contained" color="inherit" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </Stack>
      </Container>

      <Stack
        sx={{
          justifySelf: "center",
          marginInline: "auto",
          marginBlock: "2em",
          transform: "scale(0.75)",
        }}
      >
        <Typography variant="body2">ID: {data.id}</Typography>
      </Stack>
    </Stack>
  );
}
