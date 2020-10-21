import {Container, Typography} from "@material-ui/core";
import * as React from "react";
import PseudowordTable from "../components/PseudowordTable";
import WuggyInput from "../components/WuggyInput";
export default class Root extends React.Component<
  unknown,
  {pseudowordMatches: PseudowordMatches; pendingGeneration: boolean}
> {
  constructor(props) {
    super(props);
    this.state = {
      pseudowordMatches: {
        word: "",
        matches: [],
      },
      pendingGeneration: false,
    };
  }

  onPseudowordMatchesChange = (pseudowordMatches: PseudowordMatches) => {
    this.setState({pseudowordMatches, pendingGeneration: false});
  };

  onPendingGeneration = () => {
    this.setState({pendingGeneration: true});
  };

  render(): JSX.Element {
    return (
      <div>
        <Container fixed id="main-container">
          <img
            id={
              this.state.pendingGeneration
                ? "wuggy-icon-animated"
                : "wuggy-icon"
            }
            src="/assets/wuggyIcon.jpg"
          ></img>
          <Typography>Wuggy Web Proof of Concept</Typography>
          <WuggyInput
            onPendingGeneration={this.onPendingGeneration}
            onPseudowordMatchesChange={this.onPseudowordMatchesChange}
          ></WuggyInput>
          <Typography>Generated Pseudowords</Typography>
          <PseudowordTable
            pseudowordMatches={this.state.pseudowordMatches}
          ></PseudowordTable>
        </Container>
      </div>
    );
  }
}
