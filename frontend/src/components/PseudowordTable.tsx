import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

export default function PseudowordTable(props: {
  pseudowordMatches: PseudowordMatches;
}): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Word</TableCell>
            <TableCell align="right">Match</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pseudowordMatches.matches.map(match => (
            <TableRow key={match}>
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
