const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { IconButton } = wp.components;
const { InnerBlocks } = wp.editor;
const { createBlock } = wp.blocks;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
import '../../components/GlobalSettings';
import { accordionItemSettings } from './innerItem';

const getAccordionTemplate = ( attributes ) => {
    const result = [];
    const defaultItems = attributes.defaultItems;
    for ( let k = 0; k < defaultItems; k++ ) {
        const content = 'Create stylish call-to-action buttons with Qubely Buttons. Play around with typography, design, border and more. Add animations and personalize it to engage visitors instantly.';
        result.push( [ 'qubely/accordion-item', { itemNumber: k, defaultText: content } ] );
    }
    return result;
};

class AccordionBlock extends Component {
    
    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
    }

    insertAccordionItem() {
        let newBlockAttributes;
        const { clientId, insertBlock, block } = this.props;
        if ( block.innerBlocks && block.innerBlocks.length ) {
            const lastBlockAttributes = block.innerBlocks[ block.innerBlocks.length-1 ].attributes;
            const itemNumber =  lastBlockAttributes.itemNumber+1;
            const heading = accordionItemSettings.heading;
            newBlockAttributes = Object.assign( {}, lastBlockAttributes, { itemNumber, heading, active: false, defaultText: '' } );
        } else {
            newBlockAttributes = accordionItemSettings;
        }
        insertBlock( createBlock( 'qubely/accordion-item', newBlockAttributes ), undefined, clientId );
    }

    render() {
        const { attributes, isSelectedBlockInRoot } = this.props;
        const { uniqueId } = attributes;
        return (
            <Fragment>
                <div className={`qubely-block-accordion qubely-block-${uniqueId}`}>
                    <InnerBlocks
                        template={ getAccordionTemplate( attributes ) }
                        allowedBlocks={ [ 'qubely/accordion-item' ] }
                    />
                </div>
                
                { isSelectedBlockInRoot ? (
                    <div className="qubely-accordion-add-item">
                        <IconButton
                            icon={ 'insert' }
                            onClick={ () => {
                                this.insertAccordionItem();
                            } }
                        >
                            { __( 'Add Accordion Item' ) }
                        </IconButton>
                    </div>
                ) : '' }
            </Fragment>
        );
    }
}

export default compose( [
    withSelect( ( select, ownProps ) => {
        const { clientId } = ownProps;
        const { getBlock, isBlockSelected, hasSelectedInnerBlock } = select( 'core/editor' );
        return {
            block: getBlock( clientId ),
            isSelectedBlockInRoot: isBlockSelected( clientId ) || hasSelectedInnerBlock( clientId, true ),
        };
    } ),
    withDispatch( ( dispatch ) => {
        const { insertBlock, updateBlockAttributes } = dispatch( 'core/editor' );
        return {
            insertBlock,
            updateBlockAttributes
        };
    } ),
] )( AccordionBlock )
