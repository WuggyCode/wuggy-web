import {Input, Button} from "@material-ui/core";
import React from "react";
import axios from "axios";
export default class WuggyInput extends React.Component<
  unknown,
  {referenceSequence: string}
> {
  constructor(props) {
    super(props);
    this.state = {referenceSequence: undefined};
  }
  async submitGenerateQuery(): Promise<void> {
    console.log(this.state.referenceSequence);
    console.log(process.env.GATSBY_WUGGY_SERVER_BASE_URL);
    if (this.state.referenceSequence == null) {
      return;
    }
    const data = (
      await axios.get(
        process.env.GATSBY_WUGGY_SERVER_BASE_URL +
          `/generate?referenceSequence=${this.state.referenceSequence}`
      )
    ).data;
    console.log(data);
  }

  render(): JSX.Element {
    return (
      <form
        noValidate
        autoComplete="off"
        onSubmit={async e => {
          e.preventDefault();
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
        <Button type="submit" variant="contained" color="primary">
          Generate (simple)
        </Button>
      </form>
    );
  }
}
