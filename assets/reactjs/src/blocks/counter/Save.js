const { Component, Fragment } = wp.element;
import { animationAttr } from '../../components/HelperFunction'

class Save extends Component {
    render() {
        const { uniqueId, counterLimit, counterDuration, postfix, prefix, animation } = this.props.attributes
        return (
            <div className={`qubely-block-${uniqueId}`} {...animationAttr(animation)}>   
                <div className="qubely-block-counter">
                    <div className="qubely-block-counter-content">
                        {counterLimit > 0 &&
                            <Fragment>
                                {prefix &&
                                    <span className="qubely-block-counter-prefix">{prefix}</span>
                                }
                                <span className="qubely-block-counter-number" data-limit={counterLimit} data-start={0} data-counterDuration={counterDuration}>{0}</span>
                                {postfix &&
                                    <span className="qubely-block-counter-postfix">{postfix}</span>
                                }
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Save