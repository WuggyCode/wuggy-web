import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React from "react";
// TODO: remove any
export default function PseudowordTable(props: any): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Typography>Generated Pseudowords</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Word</TableCell>
            <TableCell align="right">Match</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pseudowordMatches.matches.map(match => (
            <TableRow key={match.name}>
              <TableCell component="th" scope="row">
                {props.pseudowordMatches.word}
              </TableCell>
              <TableCell align="right">{match}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
