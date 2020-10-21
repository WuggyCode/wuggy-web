import {Input, Button, Box, Snackbar} from "@material-ui/core";
import React from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

export default class WuggyInput extends React.Component<
  // TODO: add function types
  {onPseudowordMatchesChange: any; onPendingGeneration: any},
  {referenceSequence: string; toastOpen: boolean; pendingGeneration: boolean}
> {
  constructor(props) {
    super(props);
    this.state = {
      referenceSequence: undefined,
      toastOpen: false,
      pendingGeneration: false,
    };
  }
  async submitGenerateQuery(): Promise<void> {
    this.setState({pendingGeneration: true});
    if (this.state.referenceSequence == null) {
      return;
    }
    const data = (
      await axios.get(
        process.env.GATSBY_WUGGY_SERVER_BASE_URL +
          `/generate?referenceSequence=${this.state.referenceSequence}`
      )
    ).data;
    // TODO: failure toast when things go wrong
    this.setState({toastOpen: true, pendingGeneration: false});
    this.props.onPseudowordMatchesChange(data);
  }

  render(): JSX.Element {
    return (
      <Box mx="auto">
        <form
          noValidate
          autoComplete="off"
          onSubmit={async e => {
            e.preventDefault();
            this.props.onPendingGeneration();
            await this.submitGenerateQuery();
          }}
        >
          <Input
            required
            placeholder="Reference Sequence"
            value={this.state.referenceSequence}
            onChange={event =>
              this.setState({referenceSequence: event.target.value})
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={this.state.pendingGeneration}
          >
            Generate (simple)
          </Button>
        </form>
        <Snackbar
          open={this.state.toastOpen}
          autoHideDuration={5000}
          onClose={() => this.setState({toastOpen: false})}
        >
          <MuiAlert
            onClose={() => this.setState({toastOpen: false})}
            severity="success"
          >
            Sequences generated!
          </MuiAlert>
        </Snackbar>
      </Box>
    );
  }
}
