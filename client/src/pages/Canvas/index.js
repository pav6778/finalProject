import React, { Component } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import Nav from '../../components/nav/Nav'
import API from '../../utils/API'



class Canvas extends Component {

    state = {
        userOnline: false,
        value: "",
        lines: [],
        x: 500,
        y: 500
    };

    componentDidMount() {
        API.getUsersInfo().then(res => {
            this.setState({ lines: res.data.lines })
            if (res.data._id) {
                this.setState({ userOnline: true })
            } else {
                this.setState({ userOnline: false })
            }
        })
    }

    handleMouseDown = () => {
        this._drawing = true;
        // add line
        this.setState({
            lines: [...this.state.lines, []]
        });
    };

    handleMouseDown = () => {
        this._drawing = true;
        // add line
        this.setState({
            lines: [...this.state.lines, []]
        });
    };

    handleMouseMove = e => {
        // no drawing - skipping
        if (!this._drawing) {
            return;
        }
        const stage = this.stageRef.getStage();
        const point = stage.getPointerPosition();
        const { lines } = this.state;

        let lastLine = lines[lines.length - 1];
        // add point
        lastLine = lastLine.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        this.setState({
            lines: lines.concat()
        });
    };

    handleMouseUp = () => {
        this._drawing = false;
        this.setState({ lines: this.state.lines })
        console.log(this.state.lines)
        API.updateUsersInfo({
            lines: this.state.lines
        })
    };

    handleChange(e) {
        this.setState({ value: e.target.value })
    }

    handleSubmit = (e) => {
        const ctx = this.myCanvas.current.getContext("2d")
        ctx.font = "20px Arial"
        e.preventDefault()
        let x = this.state.x
        let y = this.state.y
        ctx.fillText(this.state.value, x, y)
        console.log(this.state.x)
    }
    clearBtn = () => {
        this.setState({ lines: [] })
        API.updateUsersInfo({ lines: this.state.lines })
    }


    render() {
        return (
            <div>
                <Nav isOnline={this.state.userOnline} />
                <div className="row">
                    <div className="col-10">
                        <div className="text-center mt-3">
                            <Stage
                                width={window.innerWidth}
                                height={window.innerHeight}
                                onContentMousedown={this.handleMouseDown}
                                onContentMousemove={this.handleMouseMove}
                                onContentMouseup={this.handleMouseUp}
                                ref={node => {
                                    this.stageRef = node;
                                }}
                            >
                                <Layer>
                                    <Text text="" />
                                    {this.state.lines.map((line, i) => (
                                        <Line key={i} points={line} stroke="black" />
                                    ))}
                                </Layer>
                            </Stage>
                        </div>
                    </div>
                    <div className="col-2 bg-light">
                        <span>+Zoom in</span><span>|</span>
                        <span>-Zoom out</span>
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <input value={this.state.value} onChange={this.handleChange}></input>
                                <input type="submit" value="Sumit"></input>
                            </form>
                        </div>
                        <div>


                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default Canvas;
