import './style.scss'
import Edit from './Edit'
import Save from './Save';
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks

registerBlockType ( 'qubely/map', {
    title: __( 'Google Map' ),
    description: 'Embed Google Maps easily with Qubely Google Maps.',
    category: 'qubely',
    icon: <img src={qubely_admin.plugin+'assets/img/blocks/block-map.svg'} alt={__('Map Block')} />,
    keywords: [ __( 'Google Map' ), __( 'Map' ), __( 'Location' ) ],
    supports: { align: ['full'] },
    attributes: {
        uniqueId: { type: 'string', default: '' },
        spacer: { type: 'object', default:{spaceTop: { md: '10', unit: "px"}, spaceBottom: { md: '10', unit: "px"}}, style: [ { selector: '{{QUBELY}}' }] },
        zoom: { type: 'number', default: '16'},
        height: { type: 'number', default: '350'},
        placeID: { type: 'string', default: ''},
        mapAddress: { type: 'string', default: ''},
        apiKey: { type: 'string', default: ''},
        iconPointer: { type: 'string', default: '' },
        showZoomButtons: { type: 'boolean', default: true },
        showMapTypeButtons: { type: 'boolean', default: true },
        showStreetViewButton: { type: 'boolean', default: true },
        showFullscreenButton: { type: 'boolean', default: true },
        optionScrollWheel: { type: 'boolean', default: true },
        optionDraggable: { type: 'boolean', default: true },
        showMarker: { type: 'boolean', default: true },
        mapStyle: { type: 'string', default: '' },
        selectedStyle: { type: 'string', default: 'default' },
        showGlobalSettings: { type: 'boolean', default: true },  // Global Settings
    },
    edit: Edit,
    save: Save,
});
