/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-06-13 12:16:02.

export interface AddLinesToStockTakingParameters {
    stockTakingId: number;
    locationNumberMatch?: string;
    maxNumItemsRemaining?: number;
    minDaysSinceLastStockTaking?: number;
    onlyDueForStockTaking: boolean;
    stockKeepingUnitMatch?: string;
}

export interface CancelDocumentParameters extends Serializable {
    contextId: number;
    documentType: DocumentType;
    documentNumber: number;
}

export interface ChangeLocationAndMoveItemsParameters extends Serializable {
    contextId: number;
    stockKeepingUnit: string;
    locationNumber: string;
}

export interface ChangeLotCostPriceParameters extends Serializable {
    globalTradeItemLotId: number;
    costPrice: number;
}

export interface ChangePasswordParameters {
    password: string;
    checkPassword: string;
}

export interface CountLotParameters extends Serializable {
    stockTakingLineId?: number;
    globalTradeItemLotId: number;
    numItemsCounted: number;
    numPackagesCounted?: number;
    discrepancyCause: DiscrepancyCause;
    notesOnCounting?: string;
}

export interface CreateAdjustmentListParameters extends Serializable {
    stockTakingId: number;
    postingDate?: Date;
}

export interface CreateBundleLotParameters extends Serializable {
    globalTradeItemId: number;
    numItems: number;
    locationNumber: string;
}

export interface CreateConsignmentNoteParameters extends Serializable {
    contextId: number;
    postingDate?: Date;
    shipmentIds?: number[];
}

export interface CreateCostOfSalesListParameters extends Serializable {
    contextId: number;
    postingDate?: Date;
    shipmentNumber?: string;
    sellerNumber?: string;
    consignmentNoteNumber?: number;
    incoterms?: Incoterms;
}

export interface CreateCostVarianceListParameters extends Serializable {
    inboundShipmentId: number;
    postingDate?: Date;
}

export interface CreateDeliveryNoteParameters {
    shipmentId: number;
    postingDate: Date;
}

export interface CreateGoodsReceiptParameters {
    inboundShipmentId: number;
    postingDate: Date;
}

export interface CreateItemControlStockTakingParameters {
    contextId: number;
    stockKeepingUnit: string;
    stockTakingNumber?: string;
    stockTakingName?: string;
}

export interface CreateOrderProposalParameters {
    contextId: number;
    globalTradeItemIds?: number[];
}

export interface CreatePickingListParameters {
    shipmentId?: number;
}

export interface CreatePurchaseOrderParameters extends Serializable {
    inboundShipmentId: number;
}

export interface CreateRequestForQuotationParameters {
    inboundShipmentId?: number;
}

export interface CreateReturnReceiptParameters {
    returnShipmentId: number;
    postingDate: Date;
}

export interface CreateStockTakingFromItemLotsParameters {
    contextId: number;
    stockTakingNumber?: string;
    stockTakingName?: string;
    globalTradeItemLotIds?: number[];
}

export interface CreateStockTakingFromItemsParameters {
    contextId: number;
    stockTakingNumber?: string;
    stockTakingName?: string;
    globalTradeItemIds: number[];
}

export interface CreateStockTakingFromLocationsParameters {
    contextId: number;
    stockTakingNumber?: string;
    stockTakingName?: string;
    locationIds?: number[];
}

export interface CreateTransportBookingParameters {
    shipmentId: number;
}

export interface CreateValueAdjustmentReceiptParameters {
    contextId: number;
    globalTradeItemLotIds?: number[];
    valueAdjustmentBase: ValueAdjustmentBase;
    percentage: number;
    postingDate?: Date;
}

export interface DeleteStackParameters {
    connectionId: number;
    applicationName: string;
}

export interface DistributeCostParameters {
    inboundShipmentId: number;
    costType: CostType;
    costDistributionKey: CostDistributionKey;
    amount: number;
}

export interface EndMultiPickingParameters {
    pickingListId: number;
}

export interface FindLocationByBarcodeParameters {
    contextId: number;
    scannedString: string;
}

export interface FindMatchingItemParameters {
    contextId: number;
    registration?: Registration;
}

export interface FindMatchingLinesToReceiveParameters {
    inboundShipmentId: number;
    registration?: Registration;
}

export interface FindPickingListByBarcodeParameters {
    contextId: number;
    scannedString: string;
}

export interface HandoverParameters extends Serializable {
    globalTradeItemLotId: number;
    numItems: number;
}

export interface InstallApplicationParameters {
    connectionId: number;
    applicationName: string;
}

export interface MoveInstanceToShippingContainerParameters {
    globalTradeItemInstanceId: number;
    shippingContainerId: number;
}

export interface MultiPickParameters {
    pickingListId: number;
    globalTradeItemId: number;
    globalTradeItemLotId?: number;
    instanceCount?: number;
}

export interface NameBoxByBarcodeParameters {
    shipmentId?: number;
    scannedString?: string;
}

export interface PackBoxParameters {
    shipmentId?: number;
    containerTypeId?: number;
}

export interface PackOneItemShipmentParameters {
    globalTradeItemId: number;
    serialNumber?: string;
}

export interface PackParameters {
    shipmentLineId: number;
    shippingContainerId?: number;
    instanceCount?: number;
    serialNumber?: string;
    weight?: number;
}

export interface ParseBarcodeParameters {
    scannedString: string;
}

export interface PickAndPackParameters {
    shipmentLineId: number;
    shippingContainerId?: number;
    globalTradeItemLotId?: number;
    instanceCount?: number;
    serialNumber?: string;
}

export interface PickParameters {
    shipmentLineId: number;
    globalTradeItemLotId?: number;
    instanceCount?: number;
}

export interface PrintDocumentParameters {
    documentId: number;
}

export interface PrintItemInstanceLabelParameters {
    globalTradeItemInstanceId: number;
    numCopies?: number;
}

export interface PrintItemLabelParameters {
    globalTradeItemId: number;
    numCopies?: number;
}

export interface PrintItemLotLabelParameters {
    globalTradeItemLotId: number;
    numCopies?: number;
}

export interface PrintLocationLabelsParameters {
    containerTypeId: number;
    locationNumberMatch?: string;
}

export interface PrintLogisticVariantLabelParameters {
    logisticVariantId: number;
    numCopies?: number;
}

export interface PutAwayParameters {
    globalTradeItemLotId: number;
    locationNumber: string;
    numItems: number;
}

export interface QuickPickAndPackParameters {
    shipmentId: number;
    printPickingList: boolean;
    printDeliveryNote: boolean;
}

export interface QuickReceiveParameters extends Serializable {
    locationNumber: string;
    inboundShipmentId: number;
}

export interface ReceiveParameters {
    inboundShipmentLineId: number;
    locationNumber: string;
    lotStatus: GlobalTradeItemLotStatus;
    expirationDate?: Date;
    batchNumber?: string;
    numItems: number;
}

export interface ReceiveReturnedParameters {
    returnShipmentLineId: number;
    locationNumber: string;
    lotStatus: GlobalTradeItemLotStatus;
    expirationDate?: Date;
    batchNumber?: string;
    numItems: number;
}

export interface ReleaseItemsParameters {
    shipmentLineId: number;
}

export interface RepackFromLotParameters extends Serializable {
    globalTradeItemLotId: number;
    stockKeepingUnit: string;
    numItemsToRepack: number;
    locationNumber: string;
}

export interface ReplenishParameters {
    globalTradeItemId: number;
    replenishFromLotId: number;
    numItems: number;
}

export interface ReserveItemsParameters {
    shipmentLineId: number;
    reservationPriority?: number;
}

export interface ReturnShipmentParameters extends Serializable {
    contextId: number;
    shipmentNumber: string;
    returnReason: ReturnReason;
}

export interface SplitStockTakingParameters {
    stockTakingId: number;
    locationNumberMatch: string;
}

export interface SplitToExistingLotParameters extends Serializable {
    sourceLotId: number;
    targetLotId: number;
    numItems: number;
}

export interface SplitToNewLotParameters extends Serializable {
    globalTradeItemLotId: number;
    lotStatus: GlobalTradeItemLotStatus;
    locationNumber: string;
    numItems: number;
}

export interface StartMultiPickingParameters {
    pickingListId: number;
}

export interface StartPackingParameters {
    shipmentId: number;
}

export interface UnbundleFromLotParameters extends Serializable {
    globalTradeItemLotId: number;
    numItems: number;
}

export interface UndoPackParameters {
    globalTradeItemInstanceId: number;
}

export interface UpdateStackParameters {
    connectionId: number;
    applicationName: string;
}

export interface ActiveSubstance extends DataTransferObject {
    activeSubstanceName: string;
    concentrationUnit?: ConcentrationUnit;
    localizedConcentrationUnit?: string;
    dataDocument?: string;
}

export interface ActiveSubstanceInProduct extends DataTransferObject {
    productId?: number;
    productNumber?: string;
    activeSubstanceId?: number;
    activeSubstanceName?: string;
    concentrationUnit?: ConcentrationUnit;
    localizedConcentrationUnit?: string;
    concentration?: number;
}

export interface Attachment extends DataTransferObject {
    fileName: string;
    lastModified?: Date;
    localizedLastModified?: string;
    size?: number;
    presignedUrl?: string;
    eventId?: string;
    content?: string;
    base64EncodedContent?: string;
    attachmentType: string;
    localizedAttachmentType: string;
}

export interface AuditLogEntry extends DataTransferObject {
    timeCreated?: Date;
    localizedTimeCreated?: string;
    type?: AuditLogEntryType;
    localizedType?: string;
    entityName?: string;
    entityId?: number;
    userInitials?: string;
    confirmed?: boolean;
    authenticated?: boolean;
    data?: string;
    fieldNameValueMap?: { [index: string]: any };
}

export interface BundleComponent extends DataTransferObject {
    numItems: number;
    bundleId?: number;
    bundleStockKeepingUnit?: string;
    componentId?: number;
    componentStockKeepingUnit?: string;
    componentProductNumber?: string;
    componentProductName?: string;
    componentProductVariantKey?: ProductVariantKey;
}

export interface Carrier extends DataTransferObject {
    carrierName: string;
    defaultContainerTypeName?: string;
    defaultContainerTypeId?: number;
    labelReportId?: number;
    labelReportDescription?: string;
    dataDocument?: string;
}

export interface Connection extends DataTransferObject {
    connectionName?: string;
    contextName?: string;
    subscriberId?: number;
    accessToken?: string;
    apiKeyId?: string;
    usagePlanId?: string;
    runAsUserId?: number;
    runAsUserInitials?: string;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    languageCode?: LanguageCode;
    countryCode?: CountryCode;
    timeZone?: string;
    dataDocument?: string;
    locale?: Locale;
}

export interface ContainerType extends DataTransferObject {
    containerTypeName: string;
    dimensions?: Dimensions;
    weight?: number;
    innerVolume?: number;
    outerVolume?: number;
    containerPlatformType?: ContainerPlatformType;
    loadCapacity?: number;
    shippable: boolean;
    loadingMeters?: number;
    dataDocument?: string;
    localizedContainerPlatformType?: string;
    labelReportId?: number;
    labelReportDescription?: string;
    locations?: Location[];
}

export interface Context extends DataTransferObject {
    contextName: string;
    baseCurrencyCode?: CurrencyCode;
    reservationSetup?: ReservationSetup;
    globalTradeItemNumberSequence?: GlobalTradeItemNumberSequence;
    address?: Address;
    contactPerson?: ContactPerson;
    subscriberId?: number;
    globalLocationNumber?: string;
    putAwayListReportId?: number;
    replenishmentListReportId?: number;
    pickingListReportId?: number;
    deliveryNoteReportId?: number;
    consignmentNoteReportId?: number;
    multiPickingListReportId?: number;
    stockTakingListReportId?: number;
    orderProposalReportId?: number;
    purchaseOrderReportId?: number;
    requestForQuotationReportId?: number;
    nextShipmentNumber: number;
    nextInboundShipmentNumber: number;
    nextStockTakingNumber: number;
    nextReturnShipmentNumber: number;
    active: boolean;
    vatNumber?: string;
    defaultLotStatusOnArrival?: GlobalTradeItemLotStatus;
    shipmentLockTimeout?: number;
    test?: boolean;
    receiveToExistingLot?: boolean;
    receiveReturnedToExistingLot?: boolean;
    replenishToExistingLot?: boolean;
    putAwayToExistingLot?: boolean;
    costPriceRequired?: boolean;
    dataDocument?: string;
}

export interface Currency extends DataTransferObject {
    currencyCode: CurrencyCode;
    dataDocument?: string;
    exchangeRate?: number;
}

export interface Customer extends DataTransferObject {
    customerNumber: string;
    address?: Address;
    contactPerson?: ContactPerson;
    vatNumber?: string;
    currencyCode?: CurrencyCode;
    globalLocationNumber?: string;
    deliveryNoteReportId?: number;
    deliveryNoteReportName?: string;
    deliveryNoteReportDescription?: string;
    notesOnPacking?: string;
    notesOnShipping?: string;
    notesOnDelivery?: string;
    dataDocument?: string;
    text1?: string;
    goodsReceiverNumber?: string;
}

export interface Document extends DataTransferObject {
    documentType?: DocumentType;
    localizedDocumentType?: string;
    documentNumber?: number;
    initials?: string;
    createdByUserId?: number;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    postingDate?: Date;
    localizedPostingDate?: string;
    cancelled?: boolean;
    timeCancelled?: Date;
    localizedTimeCancelled?: string;
    workStatus?: DocumentWorkStatus;
    localizedWorkStatus?: string;
    countryCode?: CountryCode;
    languageCode?: LanguageCode;
    value?: number;
    reportName?: string;
    reportType?: ReportType;
    reportDescription?: string;
    reportId?: number;
    documentCreatedEventId?: string;
    documentCancelledEventId?: string;
    dataDocument?: string;
    locale?: Locale;
}

export interface DocumentNumber extends DataTransferObject {
}

export interface EventMessage extends DataTransferObject {
    eventId: string;
    time: Date;
    source?: string;
    userId?: number;
    deviceName?: string;
    messageType: MessageType;
    messageText?: string;
    documentation?: string;
    localizedTime?: string;
    localizedMessageType?: string;
    contextId: number;
}

export interface GlobalTradeItem extends DataTransferObject {
    globalTradeItemNumber?: string;
    stockKeepingUnit: string;
    productVariantKey?: ProductVariantKey;
    numUnitsContained: number;
    dimensions?: Dimensions;
    weight?: number;
    volume?: number;
    productNumber: string;
    productId: number;
    productName?: string;
    productGroupId?: number;
    productGroupName?: string;
    productUnit?: ProductUnit;
    standardCostPrice?: number;
    replenishLevel?: number;
    businessItemNumber?: string;
    locationId?: number;
    locationNumber?: string;
    supplierId?: number;
    supplierNumber?: string;
    itemCategoryName?: string;
    numItemsSaleable?: number;
    numItems?: number;
    numItemsPosted?: number;
    value?: number;
    numItemsPickable?: number;
    numItemsReserved?: number;
    localizedProductUnit?: string;
    numItemsAvailable?: number;
    stocked: boolean;
    available: boolean;
    crossDock: boolean;
    active: boolean;
    oldWhenAgeInDaysExceeds?: number;
    harmonizedSystemCode?: string;
    bundleComponents?: BundleComponent[];
    includedItems?: IncludedItem[];
    logisticVariants?: LogisticVariant[];
    season?: string;
    productLine?: string;
    brand?: string;
    design?: string;
    reorderingAllowed: boolean;
    reorderLevel?: number;
    orderUpToLevel?: number;
    replenishUpToLevel?: number;
    numItemsToOrder?: number;
    batchNumberRequired?: boolean;
    expirationDateRequired?: boolean;
    serialNumberRequired?: boolean;
    countryOfOriginCode?: CountryCode;
    dataDocument?: string;
}

export interface GlobalTradeItemInstance extends DataTransferObject {
    serialNumber?: string;
    timePacked?: Date;
    localizedTimePacked?: string;
    weight?: number;
    volume?: number;
    instanceCount?: number;
    stockKeepingUnit?: string;
    productVariantKey?: ProductVariantKey;
    productNumber?: string;
    productName?: string;
    trackingNumber?: string;
    shipmentNumber?: string;
    shipmentLineId?: number;
    packedByUserInitials?: string;
    deliveryAddress?: Address;
    localizedDeliveryAddress?: string;
    globalTradeItemId?: number;
    harmonizedSystemCode?: string;
    deliveryDate?: Date;
    localizedDeliveryDate?: string;
    productId?: number;
    shipmentId?: number;
    shippingContainerId?: number;
    customerId?: number;
    undone?: boolean;
    timeUndone?: Date;
    localizedTimeUndone?: string;
    sellersLineReference?: string;
    dangerousGoodsNumber?: string;
    hazardousPackingGroup?: HazardousPackingGroup;
    localizedHazardousPackingGroup?: string;
}

export interface GlobalTradeItemLot extends DataTransferObject {
    timeCreated?: Date;
    localizedTimeCreated?: string;
    timeLastStockTaking?: Date;
    localizedTimeLastStockTaking?: string;
    costPrice?: number;
    numItemsRemaining?: number;
    numItemsPosted?: number;
    batchNumber?: string;
    expirationDate?: Date;
    localizedExpirationDate?: string;
    timePlacedAtCurrentLocation?: Date;
    localizedTimePlacedAtCurrentLocation?: string;
    timeLastMovement?: Date;
    localizedTimeLastMovement?: string;
    lotStatus: GlobalTradeItemLotStatus;
    localizedLotStatus?: string;
    inventorySortDate: Date;
    localizedInventorySortDate?: string;
    locationNumber: string;
    zoneName?: string;
    zoneId?: number;
    globalTradeItemNumber?: string;
    stockKeepingUnit?: string;
    value?: number;
    globalTradeItemId?: number;
    locationId?: number;
    productId?: number;
    productNumber?: string;
    productName?: string;
    numUnitsContained?: number;
    productUnit?: ProductUnit;
    localizedProductUnit?: string;
    ageInDays?: number;
    productVariantKey?: ProductVariantKey;
    standardCostPrice?: number;
    _children?: GlobalTradeItemLot[];
}

export interface GlobalTradeItemLotToPutAway extends DataTransferObject {
    timeCreated?: Date;
    localizedTimeCreated?: string;
    timeLastStockTaking?: Date;
    localizedTimeLastStockTaking?: string;
    numItems?: number;
    numItemsRemaining?: number;
    batchNumber?: string;
    expirationDate?: Date;
    localizedExpirationDate?: string;
    lotStatus?: GlobalTradeItemLotStatus;
    localizedLotStatus?: string;
    inventorySortDate?: Date;
    localizedInventorySortDate?: string;
    locationNumber?: string;
    globalTradeItemNumber?: string;
    stockKeepingUnit?: string;
    globalTradeItemId?: number;
    locationId?: number;
    reservationId?: number;
    productNumber?: string;
    productName?: string;
    ageInDays?: number;
    globalTradeItemLocationNumber?: string;
    globalTradeItemLocationId?: number;
    globalTradeItemLocationPickingOrder?: number;
    productUnit?: ProductUnit;
    localizedProductUnit?: string;
    weightEach?: number;
    volumeEach?: number;
    storedLots?: string;
    numUnitsContained?: number;
    productVariantKey?: ProductVariantKey;
    numItemsRemaining_?: number;
}

export interface GlobalTradeItemToOrder extends DataTransferObject {
    globalTradeItemNumber?: string;
    stockKeepingUnit: string;
    productVariantKey?: ProductVariantKey;
    numUnitsContained: number;
    dimensions?: Dimensions;
    weight?: number;
    volume?: number;
    productNumber?: string;
    productId?: number;
    productName?: string;
    productGroupId?: number;
    productGroupName?: string;
    productUnit?: ProductUnit;
    standardCostPrice?: number;
    businessItemNumber?: string;
    itemCategoryName?: string;
    numItemsSaleable?: number;
    numItems?: number;
    numItemsReserved?: number;
    localizedProductUnit?: string;
    numItemsAvailable?: number;
    stocked: boolean;
    available: boolean;
    crossDock: boolean;
    active: boolean;
    harmonizedSystemCode?: string;
    season?: string;
    productLine?: string;
    brand?: string;
    design?: string;
    supplierId?: number;
    supplierNumber?: string;
    reorderLevel?: number;
    orderUpToLevel?: number;
    numItemsToOrder?: number;
    dataDocument?: string;
}

export interface GlobalTradeItemToPick extends DataTransferObject {
    numItemsOrdered?: number;
    numItemsPicked?: number;
    numUnitsContained?: number;
    productId?: number;
    productUnit?: ProductUnit;
    stockKeepingUnit?: string;
    productNumber?: string;
    productName?: string;
    productVariantKey?: ProductVariantKey;
    localizedProductUnit?: string;
    globalTradeItemNumber?: string;
    pickFromLots?: string;
    countRequiredMin?: number;
    controlLotFromNumItemsRemaining?: number;
}

export interface GlobalTradeItemToReplenish extends DataTransferObject {
    globalTradeItemNumber?: string;
    stockKeepingUnit: string;
    productVariantKey?: ProductVariantKey;
    numUnitsContained?: number;
    dimensions?: Dimensions;
    weight?: number;
    volume?: number;
    productNumber?: string;
    productName?: string;
    productGroupName?: string;
    replenishLevel?: number;
    locationNumber?: string;
    itemCategoryName?: string;
    numItemsSaleable?: number;
    numItemsPickable?: number;
    numItemsReserved?: number;
    localizedProductUnit?: string;
    numItemsAvailable?: number;
    replenishFromLots?: string;
    logisticVariants?: string;
    replenishUpToLevel?: number;
    pickingOrder?: number;
}

export interface InboundShipment extends DataTransferObject {
    inboundShipmentNumber: string;
    deliveryDate?: Date;
    localizedDeliveryDate?: string;
    expectedTimeOfArrival?: Date;
    localizedExpectedTimeOfArrival?: string;
    deliveryAddress?: Address;
    supplierAddress?: Address;
    incoterms?: Incoterms;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    deliveryNoteNumber?: string;
    invoiceNumber?: string;
    orderConfirmationNumber?: string;
    supplierNumber: string;
    supplierId: number;
    currencyCode?: CurrencyCode;
    currencyExchangeRate?: number;
    purchaseOrderTimeCreated?: Date;
    localizedPurchaseOrderTimeCreated?: string;
    purchaseOrderNumber?: number;
    purchaseOrderId?: number;
    requestForQuotationTimeCreated?: Date;
    localizedRequestForQuotationTimeCreated?: string;
    requestForQuotationNumber?: number;
    requestForQuotationId?: number;
    goodsReceiptTimeCreated?: Date;
    localizedGoodsReceiptTimeCreated?: string;
    goodsReceiptNumber?: number;
    goodsReceiptId?: number;
    costVarianceListTimeCreated?: Date;
    localizedCostVarianceListTimeCreated?: string;
    costVarianceListNumber?: number;
    costVarianceListId?: number;
    inboundShipmentLines?: InboundShipmentLine[];
    inboundShipmentCreatedEventId?: string;
    onHold?: boolean;
    cancelled?: boolean;
    notesOnReception?: string;
    notesOnOrdering?: string;
    purchaseStatus?: PurchaseStatus;
    localizedPurchaseStatus?: string;
    dataDocument?: string;
}

export interface InboundShipmentLine extends DataTransferObject {
    orderReference?: string;
    expectedTimeOfArrival?: Date;
    localizedExpectedTimeOfArrival?: string;
    numItemsExpected?: number;
    numItemsReceived?: number;
    numItemsInvoiced?: number;
    amountInvoiced?: number;
    expectedAmount?: number;
    actualAmount?: number;
    expectedCost?: number;
    actualCost?: number;
    standardCostPrice?: number;
    actualCostPrice?: number;
    purchasePrice?: number;
    discountPercentage?: number;
    notesOnReception?: string;
    taxes?: number;
    handlingCost?: number;
    conversionCost?: number;
    transportCost?: number;
    globalTradeItemNumber?: string;
    stockKeepingUnit: string;
    globalTradeItemId: number;
    inboundShipmentNumber?: string;
    inboundShipmentId?: number;
    productNumber?: string;
    productName?: string;
    productVariantKey?: ProductVariantKey;
    lotStatusOnArrival?: GlobalTradeItemLotStatus;
    localizedLotStatusOnArrival?: string;
    productId?: number;
    harmonizedSystemCode?: string;
    productUnit?: ProductUnit;
    localizedProductUnit?: string;
    suppliersDescription?: string;
    numUnitsContained?: number;
    currencyExchangeRate?: number;
    currencyCode?: CurrencyCode;
    goodsReceiptId?: number;
    costVarianceListId?: number;
    businessItemNumber?: string;
    weightEach?: number;
    volumeEach?: number;
    productLine?: string;
    brand?: string;
    design?: string;
    season?: string;
}

export interface InboundShipmentLineToReceive extends DataTransferObject {
    numItemsExpected?: number;
    numItemsReceived?: number;
    numItemsReserved?: number;
    numItemsSaleable?: number;
    notesOnReception?: string;
    globalTradeItemNumber?: string;
    stockKeepingUnit?: string;
    globalTradeItemId?: number;
    inboundShipmentNumber?: string;
    inboundShipmentId?: number;
    productNumber?: string;
    productName?: string;
    productVariantKey?: ProductVariantKey;
    lotStatusOnArrival?: GlobalTradeItemLotStatus;
    localizedLotStatusOnArrival?: string;
    productId?: number;
    numUnitsContained?: number;
    productUnit?: ProductUnit;
    localizedProductUnit?: string;
    globalTradeItemZoneName?: string;
    globalTradeItemLocationNumber?: string;
    batchNumberRequired?: boolean;
    expirationDateRequired?: boolean;
    currentLots?: string;
    numItemsAvailable?: number;
}

export interface InboundShipmentSummation extends DataTransferObject {
    numShipments?: number;
    numShipmentLines?: number;
    numItems?: number;
    weight?: number;
    volume?: number;
}

export interface InboundShipmentToReceive extends DataTransferObject {
    inboundShipmentNumber?: string;
    expectedTimeOfArrival?: Date;
    onHold?: boolean;
    deliveryDate?: Date;
    localizedDeliveryDate?: string;
    localizedExpectedTimeOfArrival?: string;
    deliveryAddress?: Address;
    incoterms?: Incoterms;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    deliveryNoteNumber?: string;
    invoiceNumber?: string;
    orderConfirmationNumber?: string;
    purchaseOrderTimeCreated?: Date;
    localizedPurchaseOrderTimeCreated?: string;
    purchaseOrderNumber?: number;
    purchaseOrderId?: number;
    supplierNumber?: string;
    supplierId?: number;
    numLines?: number;
    numItems?: number;
    weight?: number;
    volume?: number;
    supplierAddress?: Address;
    inboundShipmentCreatedEventId?: string;
    notesOnReception?: string;
    notesOnOrdering?: string;
    dataDocument?: string;
}

export interface IncludedItem extends DataTransferObject {
    numItems: number;
    globalTradeItemId?: number;
    stockKeepingUnit?: string;
    includedItemStockKeepingUnit?: string;
    includedItemId?: number;
    includedItemProductNumber?: string;
    includedItemProductName?: string;
    includedItemProductVariantKey?: ProductVariantKey;
}

export interface InventoryPosting extends DataTransferObject {
    value?: number;
    documentType?: DocumentType;
    localizedDocumentType?: string;
    documentId?: number;
    documentNumber?: number;
    postingDate?: Date;
    localizedPostingDate?: string;
    timeMade?: Date;
    madeByInitials?: string;
    localizedTimeMade?: string;
    transactionType?: TransactionType;
    localizedTransactionType?: string;
    inventoryTransactionId?: number;
    numItems?: number;
    productNumber?: string;
    productName?: string;
    stockKeepingUnit?: string;
    globalTradeItemId?: number;
    productId?: number;
    productGroupId?: number;
    productGroupName?: string;
    productVariantKey?: ProductVariantKey;
    reversedPostingId?: number;
    reversalPostingId?: number;
    reversalPostingTimeMade?: Date;
    localizedReversalPostingTimeMade?: string;
    shipmentId?: number;
    shipmentNumber?: string;
    inboundShipmentId?: number;
    inboundShipmentNumber?: string;
    supplierId?: number;
    customerId?: number;
    sellerId?: number;
    sellerNumber?: string;
    inboundShipmentLineId?: number;
    shipmentLineId?: number;
    globalTradeItemLotId?: number;
    returnShipmentLineId?: number;
    returnShipmentId?: number;
    returnShipmentNumber?: string;
    accumulatedNumItems?: number;
    accumulatedValue?: number;
}

export interface InventoryTransaction extends DataTransferObject {
    timeMade?: Date;
    madeByInitials?: string;
    productNumber?: string;
    productName?: string;
    stockKeepingUnit?: string;
    transactionType?: TransactionType;
    numItems?: number;
    value?: number;
    numItemsPosted?: number;
    localizedTimeMade?: string;
    localizedTransactionType?: string;
    reversedTransactionId?: number;
    reversalTransactionId?: number;
    reversalTransactionTimeMade?: Date;
    batchNumber?: string;
    expirationDate?: Date;
    localizedExpirationDate?: string;
    inventorySortDate?: Date;
    localizedInventorySortDate?: string;
    globalTradeItemNumber?: string;
    productId?: number;
    globalTradeItemId?: number;
    globalTradeItemLotId?: number;
    reservationId?: number;
    splittedToLotId?: number;
    stockTakingLineId?: number;
    harmonizedSystemCode?: string;
    shipmentId?: number;
    shipmentNumber?: string;
    inboundShipmentId?: number;
    inboundShipmentNumber?: string;
    supplierId?: number;
    customerId?: number;
    sellerId?: number;
    sellerNumber?: string;
    inboundShipmentLineId?: number;
    shipmentLineId?: number;
    returnShipmentLineId?: number;
    returnShipmentId?: number;
    returnShipmentNumber?: string;
    accumulatedNumItems?: number;
    locationId?: number;
    locationNumber?: string;
    discrepancyCause?: DiscrepancyCause;
    localizedDiscrepancyCause?: string;
    notesOnCounting?: string;
    productVariantKey?: ProductVariantKey;
    numUnitsContained?: number;
    productUnit?: ProductUnit;
}

export interface ItemCategory extends DataTransferObject {
    itemCategoryName: string;
    itemCategoryDescription?: string;
    dataDocument?: string;
}

export interface Location extends DataTransferObject {
    locationNumber: string;
    name?: string;
    locationType: LocationType;
    localizedLocationType?: string;
    pickingOrder?: number;
    localizedLocationStructure?: string;
    numGlobalTradeItemLots?: number;
    numGlobalTradeItems?: number;
    zoneId?: number;
    zoneName?: string;
    putAwayContents?: boolean;
    containerTypeId: number;
    containerTypeName: string;
    dataDocument?: string;
}

export interface LogisticVariant extends DataTransferObject {
    globalTradeItemId?: number;
    stockKeepingUnit?: string;
    level?: number;
    numItemsContained?: number;
    globalTradeItemNumber?: string;
    dimensions?: Dimensions;
    weight?: number;
    volume?: number;
}

export interface ProductCustomsInformation extends DataTransferObject {
    productId?: number;
    productNumber?: string;
    countryCode: CountryCode;
    tariffNumber: string;
}

export interface Product extends DataTransferObject {
    productNumber: string;
    productName: string;
    productUnit?: ProductUnit;
    localizedProductUnit?: string;
    season?: string;
    productLine?: string;
    brand?: string;
    design?: string;
    harmonizedSystemCode?: string;
    importExportText?: string;
    ingredients?: string;
    instructions?: string;
    dangerousGoodsNumber?: string;
    hazardousPackingGroup?: HazardousPackingGroup;
    productGroupName: string;
    inventorySortDateMapping: InventorySortDateMapping;
    batchNumberRequired: boolean;
    expirationDateRequired: boolean;
    countRequiredMin?: number;
    serialNumberRequired: boolean;
    productGroupId: number;
    activeSubstances?: ActiveSubstanceInProduct[];
    customsInformation?: ProductCustomsInformation[];
    hazards?: ProductHazard[];
    dataDocument?: string;
}

export interface ProductGroup extends DataTransferObject {
    productGroupName: string;
    defaultProductUnit: ProductUnit;
    localizedDefaultProductUnit?: string;
    batchNumberRequired: boolean;
    expirationDateRequired: boolean;
    countRequiredMin: number;
    serialNumberRequired?: boolean;
    stockTakingInterval?: number;
    controlLotFromNumItemsRemaining?: number;
    inventorySortDateMapping?: InventorySortDateMapping;
    localizedInventorySortDateMapping?: string;
    itemLabelReportId?: number;
    itemLotLabelReportId?: number;
    itemInstanceLabelReportId?: number;
    logisticVariantLabelReportId?: number;
    itemLabelReportDescription?: string;
    itemLotLabelReportDescription?: string;
    itemInstanceLabelReportDescription?: string;
    logisticVariantLabelReportDescription?: string;
    dataDocument?: string;
}

export interface ProductHazard extends DataTransferObject {
    productId?: number;
    productNumber?: string;
    hazardCode: HazardCode;
    localizedHazardCode?: string;
}

export interface Report extends DataTransferObject {
    subscriberId?: number;
    reportName: string;
    reportType: ReportType;
    localizedReportType?: string;
    reportGenerator: ReportGenerator;
    localizedReportGenerator?: string;
    reportDescription: string;
    template?: string;
    dataDocument?: string;
}

export interface Reservation extends DataTransferObject {
    timeMade?: Date;
    localizedTimeMade?: string;
    sellersReference?: string;
    shippingStartDate?: Date;
    localizedShippingStartDate?: string;
    numItemsReserved: number;
    text?: string;
    globalTradeItemId: number;
    stockKeepingUnit: string;
    productId?: number;
    productNumber?: string;
    productName?: string;
    numItemsAvailable?: number;
    reservationPriority?: number;
    numShipmentLines?: number;
    sellerId?: number;
    sellerNumber?: string;
    productVariantKey?: ProductVariantKey;
    globalTradeItemNumber?: string;
    numUnitsContained?: number;
    productUnit?: ProductUnit;
    localizedProductUnit?: string;
}

export interface ReturnShipment extends DataTransferObject {
    returnShipmentNumber: string;
    returnReceiptId?: number;
    returnReceiptNumber?: number;
    returnReceiptTimeCreated?: Date;
    localizedReturnReceiptTimeCreated?: string;
    notes?: string;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    currencyCode?: CurrencyCode;
    currencyExchangeRate?: number;
    customerNumber: string;
    customerAddress?: Address;
    customerId: number;
    shipmentId?: number;
    shipmentNumber?: string;
    returnShipmentLines?: ReturnShipmentLine[];
    dataDocument?: string;
    onHold?: boolean;
    cancelled?: boolean;
}

export interface ReturnShipmentLine extends DataTransferObject {
    customerNumber?: string;
    returnShipmentNumber: string;
    stockKeepingUnit: string;
    productVariantKey?: ProductVariantKey;
    globalTradeItemId?: number;
    globalTradeItemNumber?: string;
    productId?: number;
    customerId: number;
    returnShipmentId: number;
    productNumber?: string;
    productName?: string;
    returnReason?: ReturnReason;
    localizedReturnReason?: string;
    numItemsExpected?: number;
    numItemsReceived?: number;
    notesOnReception?: string;
    lotStatusOnArrival?: GlobalTradeItemLotStatus;
    localizedLotStatusOnArrival?: string;
    refund?: number;
    currencyCode?: CurrencyCode;
    currencyExchangeRate?: number;
    numUnitsContained?: number;
    localizedProductUnit?: string;
    productUnit?: ProductUnit;
    returnReceiptId?: number;
}

export interface ReturnShipmentLineToReceive extends DataTransferObject {
    stockKeepingUnit?: string;
    productVariantKey?: ProductVariantKey;
    globalTradeItemId?: number;
    globalTradeItemNumber?: string;
    productId?: number;
    returnShipmentId?: number;
    productNumber?: string;
    productName?: string;
    returnReason?: ReturnReason;
    localizedReturnReason?: string;
    numItemsExpected?: number;
    numItemsReceived?: number;
    notesOnReception?: string;
    lotStatusOnArrival?: GlobalTradeItemLotStatus;
    localizedLotStatusOnArrival?: string;
    refund?: number;
    numUnitsContained?: number;
    localizedProductUnit?: string;
    productUnit?: ProductUnit;
    currentLots?: string;
    globalTradeItemLocationNumber?: string;
    globalTradeItemZoneName?: string;
    batchNumberRequired?: boolean;
    expirationDateRequired?: boolean;
    returnShipmentNumber?: string;
}

export interface ReturnShipmentSummation extends DataTransferObject {
    numShipments?: number;
    numShipmentLines?: number;
    numItems?: number;
    weight?: number;
    volume?: number;
}

export interface ReturnShipmentToReceive extends DataTransferObject {
    returnShipmentNumber?: string;
    notes?: string;
    onHold?: boolean;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    currencyCode?: CurrencyCode;
    currencyExchangeRate?: number;
    customerNumber?: string;
    customerAddress?: Address;
    customerId?: number;
    shipmentId?: number;
    shipmentNumber?: string;
    numItems?: number;
    numLines?: number;
    weight?: number;
    volume?: number;
    dataDocument?: string;
}

export interface Seller extends DataTransferObject {
    sellerNumber: string;
    address?: Address;
    contactPerson?: ContactPerson;
    vatNumber?: string;
    globalLocationNumber?: string;
    reservationSetup?: ReservationSetup;
    dataDocument?: string;
}

export interface Shipment extends DataTransferObject {
    shipmentNumber: string;
    sellersReference?: string;
    carrierName?: string;
    carrierId?: number;
    deliveryAddress?: Address;
    sellerAddress?: Address;
    customerAddress?: Address;
    deliveryDate?: Date;
    incoterms?: Incoterms;
    localizedIncoterms?: string;
    localizedDeliveryDate?: string;
    shippingDeadline?: Date;
    localizedShippingDeadline?: string;
    ourReference?: string;
    customersReference?: string;
    otherReference?: string;
    customersRequisitionNumber?: string;
    onHold?: boolean;
    cancelled?: boolean;
    shippingPriority?: number;
    privateDelivery?: boolean;
    requireReceiptOnDelivery?: boolean;
    unattendedDelivery?: boolean;
    text1?: string;
    contactPerson?: ContactPerson;
    sellerContactPerson?: ContactPerson;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    notesOnPacking?: string;
    notesOnShipping?: string;
    notesOnDelivery?: string;
    termsOfDelivery?: string;
    termsOfPayment?: string;
    transportRequired?: boolean;
    deliverToPickUpPoint?: boolean;
    pickUpPointId?: string;
    customerNumber: string;
    customerId: number;
    sellerNumber?: string;
    sellerId?: number;
    deliveryNoteNumber?: number;
    deliveryNoteId?: number;
    pickingListNumber?: number;
    pickingListId?: number;
    transportBookingNumber?: number;
    transportBookingId?: number;
    transportBookingTimeCreated?: Date;
    localizedTransportBookingTimeCreated?: string;
    pickToBoxNumber?: number;
    freightCharged?: number;
    discountGiven?: number;
    vatAmount?: number;
    paymentAmount?: number;
    currencyCode?: CurrencyCode;
    currencyExchangeRate?: number;
    showOnMobile?: boolean;
    producersId?: number;
    shippingStatus?: ShippingStatus;
    localizedShippingStatus?: string;
    carriersShipmentNumber?: string;
    pickingListTimeCreated?: Date;
    deliveryNoteTimeCreated?: Date;
    localizedPickingListTimeCreated?: string;
    localizedDeliveryNoteTimeCreated?: string;
    shipmentLines?: ShipmentLine[];
    shippingContainers?: ShippingContainer[];
    vatNumber?: string;
    shipmentCreatedEventId?: string;
    consignmentNoteNumber?: number;
    consignmentNoteId?: number;
    costOfSalesListNumber?: number;
    costOfSalesListId?: number;
    costOfSalesListTimeCreated?: Date;
    localizedCostOfSalesListTimeCreated?: string;
    consignmentNoteTimeCreated?: Date;
    localizedConsignmentNoteTimeCreated?: string;
    dataDocument?: string;
    shippingStatusString?: string;
    /**
     * @deprecated
     */
    goodsReceiversReference?: string;
    /**
     * @deprecated
     */
    goodsReceiverId?: number;
    /**
     * @deprecated
     */
    goodsReceiverNumber?: string;
}

export interface ShipmentLine extends DataTransferObject {
    numItemsOrdered: number;
    numUnitsContained?: number;
    sellersReference?: string;
    numItemsPacked?: number;
    numItemsPicked?: number;
    abandoned: boolean;
    salesPrice?: number;
    totalAmount?: number;
    recommendedRetailPrice?: number;
    discountPercentage?: number;
    vatPercentage?: number;
    standardCostPrice?: number;
    orderReference?: string;
    notesOnPicking?: string;
    customersItemNumber?: string;
    reservationId?: number;
    globalTradeItemNumber?: string;
    shipmentNumber: string;
    shipmentId: number;
    stockKeepingUnit: string;
    productNumber?: string;
    productName?: string;
    globalTradeItemId: number;
    productVariantKey?: ProductVariantKey;
    productId: number;
    reservationPriority?: number;
    reservationText?: string;
    numItemsReserved?: number;
    numItemsAvailable?: number;
    available?: boolean;
    harmonizedSystemCode?: string;
    importExportText?: string;
    weight?: number;
    productUnit?: ProductUnit;
    localizedProductUnit?: string;
    customsTariffNumber?: string;
    text1?: string;
    deliveryNoteId?: number;
    costOfSalesListId?: number;
    countryOfOriginCode?: CountryCode;
}

export interface ShipmentLineDeliveryDateSummation extends ShipmentLineSummation {
    deliveryDate?: Date;
    localizedDeliveryDate?: string;
}

export interface ShipmentLineSummation extends DataTransferObject {
    numLines?: number;
    numLinesAvailable?: number;
    numItemsOrdered?: number;
    totalAmount?: number;
    numItemsPacked?: number;
    numShipments?: number;
}

export interface ShipmentLineToPack extends DataTransferObject {
    numItemsOrdered?: number;
    numItemsPicked?: number;
    numItemsPacked?: number;
    notesOnPicking?: string;
    numUnitsContained?: number;
    productUnit?: ProductUnit;
    localizedProductUnit?: string;
    globalTradeItemNumber?: string;
    shipmentNumber?: string;
    shipmentId?: number;
    stockKeepingUnit?: string;
    productNumber?: string;
    productName?: string;
    globalTradeItemId?: number;
    productVariantKey?: ProductVariantKey;
    productId?: number;
    numItemsRemaining?: number;
    pickToBoxNumber?: number;
    pickToBoxName?: string;
    reservationId?: number;
    countRequiredMin?: number;
    serialNumberRequired?: boolean;
    available?: boolean;
    abandoned?: boolean;
    pickFromLots?: string;
    controlLotFromNumItemsRemaining?: number;
}

export interface ShipmentSummation extends DataTransferObject {
    numShipments?: number;
    numShipmentLines?: number;
    numItems?: number;
    weight?: number;
    volume?: number;
}

export interface ShipmentToLoad extends DataTransferObject {
    shipmentNumber: string;
    sellersReference?: string;
    carrierName?: string;
    carrierId?: number;
    deliveryAddress?: Address;
    deliveryDate?: Date;
    incoterms?: Incoterms;
    localizedIncoterms?: string;
    localizedDeliveryDate?: string;
    ourReference?: string;
    customersReference?: string;
    otherReference?: string;
    customersRequisitionNumber?: string;
    shippingPriority?: number;
    privateDelivery?: boolean;
    requireReceiptOnDelivery?: boolean;
    unattendedDelivery?: boolean;
    contactPerson?: ContactPerson;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    notesOnShipping?: string;
    notesOnDelivery?: string;
    termsOfDelivery?: string;
    termsOfPayment?: string;
    transportRequired?: boolean;
    deliverToPickUpPoint?: boolean;
    pickUpPointId?: string;
    carriersShipmentNumber?: string;
    numEurPallets?: number;
    numHalfEurPallets?: number;
    numQuarterEurPallets?: number;
    numCustomPallets?: number;
    numColliWithNoPlatform?: number;
    loadingMeters?: number;
    weight?: number;
    volume?: number;
    customerId?: number;
    sellerId?: number;
}

export interface ShipmentToPack extends DataTransferObject {
    shipmentNumber?: string;
    sellersReference?: string;
    carrierName?: string;
    carrierId?: number;
    deliveryAddress?: Address;
    sellerAddress?: Address;
    customerAddress?: Address;
    deliveryDate?: Date;
    incoterms?: Incoterms;
    localizedIncoterms?: string;
    localizedDeliveryDate?: string;
    shippingDeadline?: Date;
    localizedShippingDeadline?: string;
    lockExpirationTime?: Date;
    localizedLockExpirationTime?: string;
    ourReference?: string;
    customersReference?: string;
    otherReference?: string;
    customersRequisitionNumber?: string;
    onHold?: boolean;
    shippingPriority?: number;
    contactPerson?: ContactPerson;
    sellerContactPerson?: ContactPerson;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    notesOnPacking?: string;
    notesOnShipping?: string;
    notesOnDelivery?: string;
    termsOfDelivery?: string;
    termsOfPayment?: string;
    transportRequired?: boolean;
    deliverToPickUpPoint?: boolean;
    pickUpPointId?: string;
    customerNumber?: string;
    customerId?: number;
    sellerNumber?: string;
    sellerId?: number;
    pickingListNumber?: number;
    pickingListId?: number;
    transportBookingNumber?: number;
    transportBookingId?: number;
    transportBookingWorkStatus?: DocumentWorkStatus;
    pickingListWorkStatus?: DocumentWorkStatus;
    transportBookingCreatedEventId?: string;
    localizedTransportBookingWorkStatus?: string;
    numLines?: number;
    numItems?: number;
    weight?: number;
    volume?: number;
    pickToBoxNumber?: number;
    pickToBoxName?: string;
    localizedTimeShippingLabelsRequested?: string;
    showOnMobile?: boolean;
    carriersShipmentNumber?: string;
    pickingListTimeCreated?: Date;
    localizedPickingListTimeCreated?: string;
    localizedPickingListWorkStatus?: string;
    numLinesItemsNotAvailable?: number;
    locked?: boolean;
    lockedByInitials?: string;
    shipmentCreatedEventId?: string;
    dataDocument?: string;
    /**
     * @deprecated
     */
    goodsReceiversReference?: string;
    /**
     * @deprecated
     */
    goodsReceiverId?: number;
    /**
     * @deprecated
     */
    goodsReceiverNumber?: string;
}

export interface ShippingContainer extends DataTransferObject {
    containerTypeId: number;
    containerTypeName: string;
    trackingNumber?: string;
    trackingUrl?: string;
    serialShippingContainerCode?: string;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    weight?: number;
    grossWeight?: number;
    tareWeight?: number;
    loadCapacity?: number;
    netWeight?: number;
    innerVolume?: number;
    outerVolume?: number;
    volume?: number;
    dimensions?: Dimensions;
    numGlobalTradeItemInstances?: number;
    carrierName?: string;
    carriersShipmentNumber?: string;
    shipmentNumber?: string;
    shipmentId?: number;
    platformType?: ContainerPlatformType;
    localizedPlatformType?: string;
}

export interface StockTaking extends DataTransferObject {
    stockTakingNumber: string;
    stockTakingName?: string;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    stockTakingListTimeCreated?: Date;
    localizedStockTakingListTimeCreated?: string;
    adjustmentListTimeCreated?: Date;
    adjustmentListId?: number;
    stockTakingListId?: number;
    localizedAdjustmentListTimeCreated?: string;
    stockTakingType?: StockTakingType;
    localizedStockTakingType?: string;
    dataDocument?: string;
    stockTakingLines?: StockTakingLine[];
}

export interface StockTakingLine extends DataTransferObject {
    stockTakingId: number;
    counted?: boolean;
    timeCounted?: Date;
    countedByInitials?: string;
    localizedTimeCounted?: string;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    numItemsCounted?: number;
    numItemsAdjusted?: number;
    globalTradeItemLotId: number;
    globalTradeItemId?: number;
    stockTakingNumber: string;
    stockKeepingUnit?: string;
    globalTradeItemNumber?: string;
    batchNumber?: string;
    expirationDate?: Date;
    localizedExpirationDate?: string;
    locationNumber?: string;
    productNumber?: string;
    productName?: string;
    productVariantKey?: ProductVariantKey;
    discrepancyCause?: DiscrepancyCause;
    localizedDiscrepancyCause?: string;
    inventorySortDate?: Date;
    localizedInventorySortDate?: string;
    lotStatus?: GlobalTradeItemLotStatus;
    localizedLotStatus?: string;
    productId?: number;
    stockTakingType?: StockTakingType;
    localizedStockTakingType?: string;
    notesOnCounting?: string;
}

export interface StockTakingLineToDo extends DataTransferObject {
    stockTakingId?: number;
    counted?: boolean;
    timeCounted?: Date;
    countedByInitials?: string;
    localizedTimeCounted?: string;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    numItemsCounted?: number;
    numItemsAdjusted?: number;
    globalTradeItemLotId?: number;
    globalTradeItemId?: number;
    stockKeepingUnit?: string;
    globalTradeItemNumber?: string;
    productUnit?: ProductUnit;
    localizedProductUnit?: string;
    numUnitsContained?: number;
    batchNumber?: string;
    expirationDate?: Date;
    localizedExpirationDate?: string;
    locationNumber?: string;
    productNumber?: string;
    productName?: string;
    productVariantKey?: ProductVariantKey;
    discrepancyCause?: DiscrepancyCause;
    localizedDiscrepancyCause?: string;
    inventorySortDate?: Date;
    localizedInventorySortDate?: string;
    lotStatus?: GlobalTradeItemLotStatus;
    localizedLotStatus?: string;
    timeLastMovement?: Date;
    localizedTimeLastMovement?: string;
    timeLastStockTaking?: Date;
    localizedTimeLastStockTaking?: string;
    numItemsRemaining?: number;
    productId?: number;
    notesOnCounting?: string;
    ageInDays?: number;
}

export interface StockTakingToDo extends DataTransferObject {
    stockTakingNumber?: string;
    stockTakingName?: string;
    timeCreated?: Date;
    localizedTimeCreated?: string;
    stockTakingListTimeCreated?: Date;
    localizedStockTakingListTimeCreated?: string;
    stockTakingListId?: number;
    stockTakingType?: StockTakingType;
    localizedStockTakingType?: string;
    numLines?: number;
    numLinesCounted?: number;
    dataDocument?: string;
    stockTakingLines?: StockTakingLine[];
}

export interface Subscriber extends DataTransferObject {
    domain?: string;
    dateSignedUp?: Date;
    blocked?: boolean;
    maxNumSessions: number;
    itemLedgerEnabled: boolean;
    purchasingEnabled: boolean;
}

export interface Supplier extends DataTransferObject {
    supplierNumber: string;
    address?: Address;
    contactPerson?: ContactPerson;
    defaultCurrencyCode?: CurrencyCode;
    defaultLeadTimeInDays?: number;
    defaultIncoterms?: Incoterms;
    localizedDefaultIncoterms?: string;
    dataDocument?: string;
}

export interface User extends DataTransferObject {
    subscriberId?: number;
    initials: string;
    languageCode: LanguageCode;
    countryCode: CountryCode;
    warehousingOnly: boolean;
    timeZone: string;
    administrator: boolean;
    contextNameFilter?: string;
    email: string;
    resetPasswordToken?: string;
    dataDocument?: string;
    locale?: Locale;
}

export interface Zone extends DataTransferObject {
    zoneName: string;
    zoneDescription?: string;
    dataDocument?: string;
}

export interface Serializable {
}

export interface Registration extends Serializable {
    serialShippingContainerCode?: string;
    numItemsContained?: number;
    containedGlobalTradeItemNumber?: string;
    productAdditionalIdentification?: string;
    globalTradeItemNumber?: string;
    variantCode?: number;
    batchNumber?: string;
    serialNumber?: string;
    expirationDate?: Date;
    bestBeforeDate?: Date;
    dimensions?: Dimensions;
    weight?: number;
    volume?: number;
    numUnitsContained?: number;
    instanceCount?: number;
    trackingNumber?: string;
    packagingLevel?: number;
    length?: number;
    width?: number;
    depth?: number;
    singleValue?: string;
    netWeightInKg?: number;
}

export interface DataTransferObject extends Serializable {
    id?: number;
    contextId?: number;
}

export interface ProductVariantKey {
    description?: string;
    packagingType?: string;
    color?: string;
    size?: string;
    material?: string;
    fullDescription?: string;
}

export interface Locale extends Cloneable, Serializable {
}

export interface Dimensions extends Serializable {
    height?: number;
    width?: number;
    length?: number;
}

export interface ReservationSetup {
    writeDownWhenShipmentOnHold: boolean;
    writeDownWhenShipmentLineAbandoned: boolean;
}

export interface GlobalTradeItemNumberSequence {
    prefix?: string;
    nextNumber?: number;
}

export interface Address {
    addressee?: string;
    careOf?: string;
    streetNameAndNumber?: string;
    floorBlockOrSuite?: string;
    districtOrCityArea?: string;
    cityTownOrVillage?: string;
    stateOrProvince?: string;
    postalCode?: string;
    countryCode?: CountryCode;
    countryName?: string;
}

export interface ContactPerson {
    name?: string;
    email?: string;
    phoneNumber?: string;
    mobileNumber?: string;
}

export interface PurchaseInvoice {
    readonly id?: number;
    readonly contextId?: number;
    readonly supplierId: number;
    currencyCode?: CurrencyCode;
    readonly timeCreated?: Date;
    readonly localizedTimeCreated?: string;
    purchaseInvoiceNumber: string;
    purchaseInvoiceDate: string | null;
    purchaseInvoiceLines: PurchaseInvoiceLine[];
    finalized: boolean;
}

export interface PurchaseInvoiceLine {
    readonly id?: number;
    readonly contextId?: number;
    readonly purchaseInvoiceId?: number;
    readonly purchaseInvoiceNumber?: string;
    readonly indexedPosition: string;
    supplierItemNumber?: string | null;
    supplierItemDescription?: string | null;
    quantity?: number | null;
    amount?: number | null;
}

export interface PurchaseInvoiceAllocation {
    id?: number;
    purchaseInvoiceLineId: number;
    inboundShipmentLineId: number;
    numItems: number;
}

export interface Cloneable {
}

export type DocumentType = "PICKING_LIST" | "MULTI_PICKING_LIST" | "DELIVERY_NOTE" | "PUT_AWAY_LIST" | "ORDER_PROPOSAL" | "VALUE_ADJUSTMENT_RECEIPT" | "GOODS_RECEIPT" | "REPLENISHMENT_LIST" | "STOCK_TAKING_LIST" | "ADJUSTMENT_LIST" | "BUNDLING_RECEIPT" | "REPACKING_RECEIPT" | "PURCHASE_ORDER" | "COST_OF_SALES_LIST" | "RETURN_RECEIPT" | "TRANSPORT_BOOKING" | "REQUEST_FOR_QUOTATION" | "HANDOVER_RECEIPT" | "CONSIGNMENT_NOTE" | "DELETED_3" | "COST_VARIANCE_LIST" | "DELETED_9" | "DELETED_4";

export type DiscrepancyCause = "SHRINKAGE" | "DAMAGED" | "TRANSFERRED" | "CONSUMED" | "EXPIRED" | "MERGED" | "SOLD_FOR_CASH";

export type Incoterms = "EXW" | "FCA" | "FAS" | "FOB" | "CPT" | "CFR" | "CIF" | "CIP" | "DAT" | "DAP" | "DDP";

export type ValueAdjustmentBase = "STANDARD_COST_PRICE" | "CURRENT_COST_PRICE";

export type CostType = "TRANSPORT" | "TAXES" | "HANDLING" | "CONVERSION";

export type CostDistributionKey = "QUANTITY" | "VALUE" | "WEIGHT" | "VOLUME";

export type GlobalTradeItemLotStatus = "SALEABLE" | "QUARANTINED" | "REJECTED" | "DAMAGED" | "RECALLED" | "MISSING" | "EXPIRED";

export type ReturnReason = "REGRETTED_PURCHASE" | "DAMAGED_ON_DELIVERY" | "BREACH_OF_WARRANTY" | "NOT_ORDERED" | "RETURNED_FOR_RECYCLING" | "RECALLED_BY_MANUFACTURER" | "DEFECTIVE_ON_DELIVERY" | "UNCLAIMED" | "UNDELIVERABLE" | "UNKNOWN";

export type ConcentrationUnit = "MIKRO_GRAM" | "MILLI_GRAM" | "GRAM" | "KILO_GRAM" | "MIKRO_LITER" | "MILLI_LITER" | "LITER" | "HEKTO_LITER" | "MILLI_MOL" | "MOL" | "PCT";

export type AttachmentType = "PURCHASE_INVOICE";

export type AuditLogEntryType = "CREATE" | "UPDATE" | "DELETE";

export type LanguageCode = "undefined" | "aa" | "ab" | "ae" | "af" | "ak" | "am" | "an" | "ar" | "as" | "av" | "ay" | "az" | "ba" | "be" | "bg" | "bh" | "bi" | "bm" | "bn" | "bo" | "br" | "bs" | "ca" | "ce" | "ch" | "co" | "cr" | "cs" | "cu" | "cv" | "cy" | "da" | "de" | "dv" | "dz" | "ee" | "el" | "en" | "eo" | "es" | "et" | "eu" | "fa" | "ff" | "fi" | "fj" | "fo" | "fr" | "fy" | "ga" | "gd" | "gl" | "gn" | "gu" | "gv" | "ha" | "he" | "hi" | "ho" | "hr" | "ht" | "hu" | "hy" | "hz" | "ia" | "id" | "ie" | "ig" | "ii" | "ik" | "io" | "is" | "it" | "iu" | "ja" | "jv" | "ka" | "kg" | "ki" | "kj" | "kk" | "kl" | "km" | "kn" | "ko" | "kr" | "ks" | "ku" | "kv" | "kw" | "ky" | "la" | "lb" | "lg" | "li" | "ln" | "lo" | "lt" | "lu" | "lv" | "mg" | "mh" | "mi" | "mk" | "ml" | "mn" | "mr" | "ms" | "mt" | "my" | "na" | "nb" | "nd" | "ne" | "ng" | "nl" | "nn" | "no" | "nr" | "nv" | "ny" | "oc" | "oj" | "om" | "or" | "os" | "pa" | "pi" | "pl" | "ps" | "pt" | "qu" | "rm" | "rn" | "ro" | "ru" | "rw" | "sa" | "sc" | "sd" | "se" | "sg" | "si" | "sk" | "sl" | "sm" | "sn" | "so" | "sq" | "sr" | "ss" | "st" | "su" | "sv" | "sw" | "ta" | "te" | "tg" | "th" | "ti" | "tk" | "tl" | "tn" | "to" | "tr" | "ts" | "tt" | "tw" | "ty" | "ug" | "uk" | "ur" | "uz" | "ve" | "vi" | "vo" | "wa" | "wo" | "xh" | "yi" | "yo" | "za" | "zh" | "zu";

export type CountryCode = "UNDEFINED" | "AC" | "AD" | "AE" | "AF" | "AG" | "AI" | "AL" | "AM" | "AN" | "AO" | "AQ" | "AR" | "AS" | "AT" | "AU" | "AW" | "AX" | "AZ" | "BA" | "BB" | "BD" | "BE" | "BF" | "BG" | "BH" | "BI" | "BJ" | "BL" | "BM" | "BN" | "BO" | "BQ" | "BR" | "BS" | "BT" | "BU" | "BV" | "BW" | "BY" | "BZ" | "CA" | "CC" | "CD" | "CF" | "CG" | "CH" | "CI" | "CK" | "CL" | "CM" | "CN" | "CO" | "CP" | "CR" | "CS" | "CU" | "CV" | "CW" | "CX" | "CY" | "CZ" | "DE" | "DG" | "DJ" | "DK" | "DM" | "DO" | "DZ" | "EA" | "EC" | "EE" | "EG" | "EH" | "ER" | "ES" | "ET" | "EU" | "EZ" | "FI" | "FJ" | "FK" | "FM" | "FO" | "FR" | "FX" | "GA" | "GB" | "GD" | "GE" | "GF" | "GG" | "GH" | "GI" | "GL" | "GM" | "GN" | "GP" | "GQ" | "GR" | "GS" | "GT" | "GU" | "GW" | "GY" | "HK" | "HM" | "HN" | "HR" | "HT" | "HU" | "IC" | "ID" | "IE" | "IL" | "IM" | "IN" | "IO" | "IQ" | "IR" | "IS" | "IT" | "JE" | "JM" | "JO" | "JP" | "KE" | "KG" | "KH" | "KI" | "KM" | "KN" | "KP" | "KR" | "KW" | "KY" | "KZ" | "LA" | "LB" | "LC" | "LI" | "LK" | "LR" | "LS" | "LT" | "LU" | "LV" | "LY" | "MA" | "MC" | "MD" | "ME" | "MF" | "MG" | "MH" | "MK" | "ML" | "MM" | "MN" | "MO" | "MP" | "MQ" | "MR" | "MS" | "MT" | "MU" | "MV" | "MW" | "MX" | "MY" | "MZ" | "NA" | "NC" | "NE" | "NF" | "NG" | "NI" | "NL" | "NO" | "NP" | "NR" | "NT" | "NU" | "NZ" | "OM" | "PA" | "PE" | "PF" | "PG" | "PH" | "PK" | "PL" | "PM" | "PN" | "PR" | "PS" | "PT" | "PW" | "PY" | "QA" | "RE" | "RO" | "RS" | "RU" | "RW" | "SA" | "SB" | "SC" | "SD" | "SE" | "SF" | "SG" | "SH" | "SI" | "SJ" | "SK" | "SL" | "SM" | "SN" | "SO" | "SR" | "SS" | "ST" | "SU" | "SV" | "SX" | "SY" | "SZ" | "TA" | "TC" | "TD" | "TF" | "TG" | "TH" | "TJ" | "TK" | "TL" | "TM" | "TN" | "TO" | "TP" | "TR" | "TT" | "TV" | "TW" | "TZ" | "UA" | "UG" | "UK" | "UM" | "US" | "UY" | "UZ" | "VA" | "VC" | "VE" | "VG" | "VI" | "VN" | "VU" | "WF" | "WS" | "XI" | "XU" | "XK" | "YE" | "YT" | "YU" | "ZA" | "ZM" | "ZR" | "ZW";

export type ContainerPlatformType = "EUR_PALLET" | "HALF_EUR_PALLET" | "QUARTER_EUR_PALLET" | "CUSTOM";

export type CurrencyCode = "UNDEFINED" | "AED" | "AFN" | "ALL" | "AMD" | "ANG" | "AOA" | "ARS" | "AUD" | "AWG" | "AZN" | "BAM" | "BBD" | "BDT" | "BGN" | "BHD" | "BIF" | "BMD" | "BND" | "BOB" | "BOV" | "BRL" | "BSD" | "BTN" | "BWP" | "BYN" | "BYR" | "BZD" | "CAD" | "CDF" | "CHE" | "CHF" | "CHW" | "CLF" | "CLP" | "CNY" | "COP" | "COU" | "CRC" | "CUC" | "CUP" | "CVE" | "CZK" | "DJF" | "DKK" | "DOP" | "DZD" | "EGP" | "ERN" | "ETB" | "EUR" | "FJD" | "FKP" | "GBP" | "GEL" | "GHS" | "GIP" | "GMD" | "GNF" | "GTQ" | "GYD" | "HKD" | "HNL" | "HRK" | "HTG" | "HUF" | "IDR" | "ILS" | "INR" | "IQD" | "IRR" | "ISK" | "JMD" | "JOD" | "JPY" | "KES" | "KGS" | "KHR" | "KMF" | "KPW" | "KRW" | "KWD" | "KYD" | "KZT" | "LAK" | "LBP" | "LKR" | "LRD" | "LSL" | "LTL" | "LYD" | "MAD" | "MDL" | "MGA" | "MKD" | "MMK" | "MNT" | "MOP" | "MRO" | "MRU" | "MUR" | "MVR" | "MWK" | "MXN" | "MXV" | "MYR" | "MZN" | "NAD" | "NGN" | "NIO" | "NOK" | "NPR" | "NZD" | "OMR" | "PAB" | "PEN" | "PGK" | "PHP" | "PKR" | "PLN" | "PYG" | "QAR" | "RON" | "RSD" | "RUB" | "RUR" | "RWF" | "SAR" | "SBD" | "SCR" | "SDG" | "SEK" | "SGD" | "SHP" | "SLL" | "SOS" | "SRD" | "SSP" | "STD" | "STN" | "SVC" | "SYP" | "SZL" | "THB" | "TJS" | "TMT" | "TND" | "TOP" | "TRY" | "TTD" | "TWD" | "TZS" | "UAH" | "UGX" | "USD" | "USN" | "USS" | "UYI" | "UYU" | "UZS" | "VEF" | "VES" | "VND" | "VUV" | "WST" | "XAF" | "XAG" | "XAU" | "XBA" | "XBB" | "XBC" | "XBD" | "XCD" | "XDR" | "XOF" | "XPD" | "XPF" | "XPT" | "XSU" | "XTS" | "XUA" | "XXX" | "YER" | "ZAR" | "ZMW" | "ZWL";

export type DocumentWorkStatus = "PENDING" | "ON_GOING" | "DONE" | "FAILED" | "CANCELLED";

export type ReportType = "PICKING_LIST" | "MULTI_PICKING_LIST" | "DELIVERY_NOTE" | "LOCATION_LABEL" | "ITEM_LABEL" | "ITEM_INSTANCE_LABEL" | "PUT_AWAY_LIST" | "STOCK_TAKING_LIST" | "ORDER_PROPOSAL" | "REPLENISHMENT_LIST" | "PACKING_COMMAND_SHEET" | "INBOUND_SHIPMENT_LINES" | "SHIPPING_CONTAINER_LABEL" | "DELETED_16" | "DELETED_17" | "PURCHASE_ORDER" | "DELETED_18" | "DELETED_19" | "ITEM_LOT_LABEL" | "TRANSPORT_BOOKING" | "REQUEST_FOR_QUOTATION" | "HANDOVER_RECEIPT" | "CONSIGNMENT_NOTE" | "DELETED_3" | "DELETED_20" | "DELETED_9" | "DELETED_4" | "LOGISTIC_VARIANT_LABEL" | "DELETED_12";

export type MessageType = "INFO" | "WARNING" | "ERROR";

export type ProductUnit = "PCS" | "G" | "KG" | "TON" | "MM" | "CM" | "M" | "L" | "HL" | "M2" | "M3" | "MM3" | "ML";

export type HazardousPackingGroup = "I" | "II" | "III";

export type PurchaseStatus = "NEW" | "TENDERED" | "ORDERED" | "RECEIVED" | "SETTLED" | "ON_HOLD" | "CANCELLED";

export type TransactionType = "RECEPTION" | "SHIPPING" | "STOCK_TAKING" | "BUNDLING" | "REPACKING" | "RETURNED" | "DEPRECATION" | "SPLITTING" | "HANDOVER" | "REPLENISHMENT" | "PUT_AWAY";

export type LocationType = "FLOOR" | "RACK" | "OTHER" | "SHELF" | "BIN" | "PALLET" | "AUTOMATA" | "SECTION" | "AISLE" | "CART";

export type InventorySortDateMapping = "DATE_RECEIVED" | "EXPIRATION_DATE";

export type HazardCode = "H200" | "H201" | "H202" | "H203" | "H204" | "H205" | "H206" | "H207" | "H208" | "H220" | "H221" | "H222" | "H223" | "H224" | "H225" | "H226" | "H227" | "H228" | "H229" | "H230" | "H231" | "H232" | "H240" | "H241" | "H242" | "H250" | "H251" | "H252" | "H260" | "H261" | "H270" | "H271" | "H272" | "H280" | "H281" | "H290" | "H300" | "H301" | "H302" | "H303" | "H304" | "H305" | "H310" | "H311" | "H312" | "H313" | "H314" | "H315" | "H316" | "H317" | "H318" | "H319" | "H320" | "H330" | "H331" | "H332" | "H333" | "H334" | "H335" | "H336" | "H340" | "H341" | "H350" | "H351" | "H360" | "H361" | "H361d" | "H362" | "H370" | "H371" | "H372" | "H373" | "H400" | "H401" | "H402" | "H410" | "H411" | "H412" | "H413" | "H420";

export type ReportGenerator = "JASPER" | "FREE_MARKER";

export type ShippingStatus = "NEW" | "IN_PROGRESS" | "PACKED" | "ON_HOLD" | "CANCELLED" | "CONSIGNED";

export type StockTakingType = "PLANNED" | "AD_HOC" | "ITEM_CONTROL";
