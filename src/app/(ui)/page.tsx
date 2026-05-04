"use client";

import type { CerealWithID } from "@lib/schema/api/cereal";
import type { Cereal } from "@lib/schema/db/cereal";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import AllItems from "./allItems";
import EditDrawer from "./editDrawer";

// import styles from "./page.module.css";

export default function Home() {
  const [rows, setRows] = useState<CerealWithID[] | undefined>(undefined);

  useEffect(() => {
    fetch("/api/cereals")
      .then((r) =>
        r.status === 200
          ? r
              .json()
              .then((v: { cereals: CerealWithID[] }) => setRows(v.cereals))
          : Promise.reject(`Got HTTP ${r.status} not 200`),
      )
      .catch((err) => console.error(err));
  }, [setRows]);

  const [editDrawerOpenFor, setEditDrawerOpenFor] = useState<Cereal>();

  return (
    <Stack>
      <AppBar position="static">
        <Typography variant="h4" sx={{ margin: "0.3em" }}>
          μs.ly
        </Typography>
      </AppBar>

      <Drawer
        anchor="right"
        open={!!editDrawerOpenFor}
        onClose={() => setEditDrawerOpenFor(undefined)}
      >
        {editDrawerOpenFor && (
          <EditDrawer
            item={editDrawerOpenFor}
            onClose={() => setEditDrawerOpenFor(undefined)}
          />
        )}
      </Drawer>

      <AllItems rows={rows} setEditDrawerOpenFor={setEditDrawerOpenFor} />
    </Stack>

    // TODO: add (button, drawer, fields, save, spinner)
    // TODO: view / edit (drawer, fields, save, spinner)
    // TODO: delete (button in the edit drawer)
    // TODO: "upload" UI (button, drawer, choose / paste / drop file, save, spinner)
  );
}
