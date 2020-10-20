import {Container, Box} from "@material-ui/core";
import * as React from "react";
import PseudowordTable from "../components/PseudowordTable";
import WuggyInput from "../components/WuggyInput";

export default class Root extends React.Component<
  unknown,
  {pseudowordMatches: any}
> {
  constructor(props) {
    super(props);
    this.state = {
      pseudowordMatches: {
        word: "car",
        matches: [
          "cacks",
          "ar",
          "cag",
          "cas",
          "cack",
          "har",
          "rar",
          "cags",
          "cacked",
          "cank",
        ],
      },
    };
  }

  render(): JSX.Element {
    return (
      <div>
        <Container fixed>
          <img src="/assets/wuggyIcon.jpg"></img>
          <Box textAlign="center">Wuggy Web Proof of Concept</Box>
          <WuggyInput></WuggyInput>
          <PseudowordTable
            pseudowordMatches={this.state.pseudowordMatches}
          ></PseudowordTable>
        </Container>
      </div>
    );
  }
}
