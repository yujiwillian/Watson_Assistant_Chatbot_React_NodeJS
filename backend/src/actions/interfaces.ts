export interface ServiceOpeningRequestData {
    abertura: {
        ReqInternalToolsPadraoREST: {
            Category: string;
            Subcategory: string;
            FluxoDeNegocio: number;
            Impact: number;
            MeioContato: string;
            RequestedFor: string;
            Model: string;
            CurrentPhase: string;
            IDExterno: string;
            Title: string;
            Description: string;
            Checklist: string[];
        };
    };
    fechamento: {
        ItemLinhaPadraoREST: {
            Replicar: boolean;
            Comentario: string[];
            Status: string;
        };
    };
}

export interface ServiceOpeningRequestResponse {
    Messages: string[];
    abertura: {
        ReqInternalToolsPadraoREST: {
            Category: string;
            Checklist: string[];
            ChecklistPergunta: string[];
            CurrentPhase: string;
            Description: string[];
            FimAtendimento: string;
            FluxoDeNegocio: number;
            ForWhomContactName: string;
            ForWhomDept: string;
            ForWhomExtension: string;
            ForWhomPhone: string;
            IDExterno: string;
            Impact: number;
            MeioContato: string;
            Model: string;
            Number: string;
            OpenedBy: string;
            PhaseDesc: string;
            RequestedFor: string;
            Subcategory: string;
            Title: string;
        };
        ReturnCode: number;
    };

    data: {
        ReqInternalToolsPadraoREST: { Number: string };
        ReturnCode: number;
    };
    ReturnCode: number;
}

export interface CreateIncidentData {
    abertura: {
        IncidentManagementPadraoDS: {
            ID: string;
            Contact: string;
            Title: string;
            Service: string;
            Category: string;
            Area: string;
            Subarea: string;
            ProblemType: string;
            UserPriority: number;
            SeverityCode: number;
            AffectedCI: string;
            OperUpdatedBy: string;
            WhoContactIdentificatin: string;
            WhoContactName: string;
            WhoContactEmail: string;
            WhoContactPhone: string;
            Description: string[];
        };
    };
    tratamento: {
        IncidentManagementPadraoDS: {
            Action: string;
            Assignee: string;
            JournalUpdates: string[];
            Replicar: boolean;
        };
    };
    fechamento: {
        IncidentManagementPadraoDS: {
            Replicar: boolean;
            OperUpdatedBy: string;
            ResolutionCode: string;
            ResolutionFixType: string;
            OperationalDevice: boolean;
            InicioIndisponibilidade: string;
            FimIndisponibilidade: string;
            DataSolucao: string;
            AffectedCIFind: boolean;
            Explanation: string[];
            OrientacaoUsuario: string[];
            Numero: string;
        };
    };
    IncidentManagementPadraoDS: {
        ID: string;
        Contact: string;
        Title: string;
        Service: string;
        Category: string;
        Area: string;
        Subarea: string;
        ProblemType: string;
        UserPriority: number;
        SeverityCode: number;
        AffectedCI: string;
        OperUpdatedBy: string;
        WhoContactIdentificatin: string;
        WhoContactName: string;
        WhoContactEmail: string;
        WhoContactPhone: string;
        Description: string[];
    };
}

export interface CreateIncidentResponse {
    IncidentManagementPadraoDS: {
        Area: string;
        AssignmentGroup: string;
        Category: string;
        CodigoJuncao: string;
        Contact: string;
        Description: string[];
        Diagnostico: string;
        DiferentContact: boolean;
        ForWhomCompany: string;
        ForWhomContactName: string;
        ForWhomDept: string;
        ForWhomDiferentContact: boolean;
        ForWhomEmail: string;
        ID: string;
        OpenTime: string;
        OpenedBy: string;
        OperUpdatedBy: string;
        PriorityCode: number;
        ProblemType: string;
        RDMRelated: boolean;
        Service: string;
        SeverityCode: number;
        Status: string;
        Subarea: string;
        TicketOwner: string;
        TipoAmbiente: string;
        Title: string;
        UpdatedBy: string;
        UpdatedTime: string;
        UserPriority: number;
        WhoContactEmail: string;
        WhoContactIdentificatin: string;
        WhoContactName: string;
        WhoContactPhone: string;
    };
    Messages: string[];
    data: { Messages: string[] };
    ReturnCode: number;
}

export interface ResolveIncidentData {
    abertura: {
        IncidentManagementPadraoDS: {
            ID: string;
            Contact: string;
            Title: string;
            Service: string;
            Category: string;
            Area: string;
            Subarea: string;
            ProblemType: string;
            UserPriority: number;
            SeverityCode: number;
            AffectedCI: string;
            OperUpdatedBy: string;
            WhoContactIdentificatin: string;
            WhoContactName: string;
            WhoContactEmail: string;
            WhoContactPhone: string;
            Description: string[];
        };
    };
    tratamento: {
        IncidentManagementPadraoDS: {
            Action: string;
            Assignee: string;
            JournalUpdates: string[];
            Replicar: boolean;
        };
    };
    fechamento: {
        IncidentManagementPadraoDS: {
            Replicar: boolean;
            OperUpdatedBy: string;
            ResolutionCode: string;
            ResolutionFixType: string;
            OperationalDevice: boolean;
            InicioIndisponibilidade: string;
            FimIndisponibilidade: string;
            DataSolucao: string;
            AffectedCIFind: boolean;
            Explanation: string[];
            OrientacaoUsuario: string[];
            Numero: string;
        };
    };
}

export interface ResolveIncidentResponse {
    abertura: {
        IncidentManagementPadraoDS: {
            ID: string;
            Contact: string;
            Title: string;
            Service: string;
            Category: string;
            Area: string;
            Subarea: string;
            ProblemType: string;
            UserPriority: number;
            SeverityCode: number;
            AffectedCI: string;
            OperUpdatedBy: string;
            WhoContactIdentificatin: string;
            WhoContactName: string;
            WhoContactEmail: string;
            WhoContactPhone: string;
            Description: string[];
        };
    };
    tratamento: {
        IncidentManagementPadraoDS: {
            Action: string;
            Assignee: string;
            JournalUpdates: string[];
            Replicar: boolean;
        };
    };
    fechamento: {
        IncidentManagementPadraoDS: {
            Action: string;
            AffectedCIFind: boolean;
            Area: string;
            Assignee: string;
            AssignmentGroup: string;
            AssignmentGroupAnt: string;
            Category: string;
            CodigoJuncao: string;
            Contact: string;
            DataSolucao: string;
            Description: string[];
            Diagnostico: string;
            DiferentContact: true;
            Explanation: string[];
            FimIndisponibilidade: string;
            ForWhomCompany: string;
            ForWhomContactName: string;
            ForWhomDept: string;
            ForWhomDiferentContact: boolean;
            ForWhomEmail: string;
            ForWhomExtention: string;
            ForWhomPhone: string;
            GrupoProprietario: string;
            ID: string;
            InicioIndisponibilidade: string;
            JournalUpdates: string[];
            LastJournalUpdates: string[];
            OpenTime: string;
            OpenedBy: string;
            OperUpdatedBy: string;
            OperationalDevice: boolean;
            OrientacaoUsuario: string[];
            PriorityCode: number;
            ProblemType: string;
            RDMRelated: boolean;
            Replicar: boolean;
            ResolutionCode: string;
            ResolutionFixType: string;
            Service: string;
            SeverityCode: number;
            Status: string;
            Subarea: string;
            TicketOwner: string;
            TipoAmbiente: string;
            Title: string;
            UpdatedBy: string;
            UpdatedTime: string;
            UserPriority: number;
            WhoContactEmail: string;
            WhoContactIdentificatin: string;
            WhoContactName: string;
            WhoContactPhone: string;
        };
    };

    Messages: string[];
    ReturnCode: number;
    data: { Messages: string[] };
}

export interface IncidentQueryReponse {
    content: [
        {
            IncidentManagementPadraoDS: {
                Action: string;
                Area: string;
                Assignee: string;
                AssignmentGroup: string;
                AssignmentGroupAnt: string;
                Category: string;
                CodigoJuncao: string;
                Contact: string;
                Description: string[];
                Diagnostico: string;
                DiferentContact: boolean;
                ForWhomCompany: string;
                ForWhomContactName: string;
                ForWhomDept: string;
                ForWhomDiferentContact: boolean;
                ForWhomEmail: string;
                ForWhomExtention: string;
                ForWhomPhone: string;
                GrupoProprietario: string;
                ID: string;
                JournalUpdates: string[];
                LastJournalUpdates: string[];
                OpenTime: string;
                OpenedBy: string;
                OperUpdatedBy: string;
                PriorityCode: number;
                ProblemType: string;
                RDMRelated: boolean;
                Replicar: boolean;
                Service: string;
                SeverityCode: number;
                Status: string;
                Subarea: string;
                TicketOwner: string;
                TipoAmbiente: string;
                Title: string;
                UpdatedBy: string;
                UpdatedTime: string;
                UserPriority: number;
                WhoContactEmail: string;
                WhoContactIdentificatin: string;
                WhoContactName: string;
                WhoContactPhone: string;
            };
        },
    ];
    Messages: string[];
    ReturnCode: number;
}

export interface ServiceRequestQueryResponse {
    Messages: string[];
    ReqInternalToolsPadraoREST: {
        Category: string;
        Checklist: string[];
        ChecklistPergunta: string[];
        CurrentPhase: string;
        Description: string[];
        FimAtendimento: string;
        FluxoDeNegocio: number;
        ForWhomContactName: string;
        ForWhomDept: string;
        ForWhomExtension: string;
        ForWhomPhone: string;
        IDExterno: string;
        Impact: number;
        MeioContato: string;
        Model: string;
        Number: string;
        OpenedBy: string;
        PhaseDesc: string;
        RequestedFor: string;
        Subcategory: string;
        Title: string;
    };
    ReturnCode: number;
}

export interface ActionPayload {
    message: string;
    payload: PayloadData;
}

export interface PayloadData {
    success: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: Object;
}

export interface CloseRSData {
    abertura: {
        ReqInternalToolsPadraoREST: {
            Category: string;
            Checklist: string[];
            ChecklistPergunta: string[];
            CurrentPhase: string;
            Description: string[];
            FimAtendimento: string;
            FluxoDeNegocio: number;
            ForWhomContactName: string;
            ForWhomDept: string;
            ForWhomExtension: string;
            ForWhomPhone: string;
            IDExterno: string;
            Impact: number;
            MeioContato: string;
            Model: string;
            Number: string;
            OpenedBy: string;
            PhaseDesc: string;
            RequestedFor: string;
            Subcategory: string;
            Title: string;
        };
        ReturnCode: number;
    };
    fechamento: {
        ItemLinhaPadraoREST: {
            Replicar: boolean;
            Comentario: string[];
            Status: string;
        };
    };
}

export interface SolveServiceRequestResponse {
    abertura: {
        ReqInternalToolsPadraoREST: {
            Category: string;
            Checklist: string[];
            ChecklistPergunta: string[];
            CurrentPhase: string;
            Description: string[];
            FimAtendimento: string;
            FluxoDeNegocio: number;
            ForWhomContactName: string;
            ForWhomDept: string;
            ForWhomExtension: string;
            ForWhomPhone: string;
            IDExterno: string;
            Impact: number;
            MeioContato: string;
            Model: string;
            Number: string;
            OpenedBy: string;
            PhaseDesc: string;
            RequestedFor: string;
            Subcategory: string;
            Title: string;
        };
        ReturnCode: number;
    };
    fechamento: {
        ItemLinhaPadraoREST: {
            Replicar: boolean;
            Comentario: string[];
            Status: string;
        };
    };
    ReturnCode: number;
}

// SERVICE NOW INTERFACES

export interface ServiceNowIncident {
    variables: {
        servico: string;
        segmento: string;
        caller_id: string;
        descricao: string[];
        data_falha: string;
        falha_impacto: string;
        informe_sintoma: string;
        acontecendo_voce: string;
        short_description: string;
        funciona_hoje_parou: string;
        titulo_do_incidente: string;
        informar_endereco_ip: string;
    };
    ReturnCode: number;
}

export interface IncidentQueryResponseSnow {
    content: [
        {
            IncidentManagementPadraoDS: {
                Action: string;
                Area: string;
                Assignee: string;
                AssignmentGroup: string;
                AssignmentGroupAnt: string;
                Category: string;
                CodigoJuncao: string;
                Contact: string;
                Description: string[];
                Diagnostico: string;
                DiferentContact: boolean;
                ForWhomCompany: string;
                ForWhomContactName: string;
                ForWhomDept: string;
                ForWhomDiferentContact: boolean;
                ForWhomEmail: string;
                ForWhomExtention: string;
                ForWhomPhone: string;
                GrupoProprietario: string;
                ID: string;
                JournalUpdates: string[];
                LastJournalUpdates: string[];
                OpenTime: string;
                OpenedBy: string;
                OperUpdatedBy: string;
                PriorityCode: number;
                ProblemType: string;
                RDMRelated: boolean;
                Replicar: boolean;
                Service: string;
                SeverityCode: number;
                Status: string;
                Subarea: string;
                TicketOwner: string;
                TipoAmbiente: string;
                Title: string;
                UpdatedBy: string;
                UpdatedTime: string;
                UserPriority: number;
                WhoContactEmail: string;
                WhoContactIdentificatin: string;
                WhoContactName: string;
                WhoContactPhone: string;
            };
        },
    ];
    Messages: string[];
    ReturnCode: number;
}

export interface ServiceNowRitm {
    variables: {
        requested_for: string;
        tipo_solicitacao: string;
        arquivo_bram_sas: string;
        descricao: string[];
    };
    ReturnCode: number;
}
