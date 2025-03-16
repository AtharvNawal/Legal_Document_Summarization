// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const uploadInput = document.querySelector('input[type="file"]');
    const dropZone = document.querySelector('.border-dashed');
    const processBtn = document.querySelector('button.w-full.mt-4.py-2.bg-blue-600');
    const uploadQueue = document.querySelector('.space-y-3');
    const summaryTabs = document.querySelectorAll('.summary-tab');
    const summaryContent = document.querySelector('.prose.max-w-none');
    const sourceReferences = document.querySelector('.mt-6.p-3.bg-gray-50');
    const questionInput = document.querySelector('input[type="text"]');
    const questionBtn = document.querySelector('button.bg-blue-600.text-white.px-4');
    const sampleQuestions = document.querySelectorAll('.inline-block.px-3.py-1.bg-gray-100');
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('#languageDropdown div');
    const historyBtn = document.getElementById('historyBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const documentTitle = document.querySelector('.p-6.border-b h2');
    
    // Sample data for demonstration
    const sampleDocuments = [
        {
            title: "Environmental Policy 2023.pdf",
            type: "pdf",
            content: {
                summary: `<p class="mb-4">
                    The Environmental Policy of 2023 establishes a comprehensive framework for <span class="highlight">sustainable development</span> and environmental protection across all sectors. This policy represents a significant update from the 2015 version, with strengthened provisions for <span class="highlight">carbon emissions reduction</span> and climate adaptation.
                </p>
                
                <p class="mb-4">
                    Key objectives include achieving <span class="highlight">carbon neutrality by 2050</span> through phased reductions in greenhouse gas emissions, expanding protected ecosystems to cover 30% of land and marine areas by 2030, and implementing a circular economy framework to minimize waste generation and resource consumption.
                </p>
                
                <p class="mb-4">
                    The policy mandates that <span class="highlight">all new development projects</span> undergo rigorous environmental impact assessments, with special provisions for projects affecting indigenous lands or ecologically sensitive areas. Public and private entities with annual revenues exceeding $10 million must submit <span class="highlight">annual environmental compliance reports</span> detailing their adherence to policy guidelines.
                </p>
                
                <p class="mb-4">
                    Enforcement mechanisms include a graduated penalty system for non-compliance, with fines ranging from 1% to 5% of annual revenue for serious violations. The policy also establishes an <span class="highlight">independent Environmental Oversight Committee</span> to monitor implementation and recommend adjustments as needed.
                </p>
                
                <p class="mb-4">
                    Of particular relevance to NGOs is Section 17, which outlines opportunities for civil society partnerships in environmental monitoring and conservation efforts, including dedicated funding streams for community-based initiatives.
                </p>`,
                keyPoints: `<ul class="list-disc space-y-2 pl-5">
                    <li><span class="font-medium">Carbon Neutrality Target:</span> Economy-wide carbon neutrality by 2050 with 45% reduction by 2030.</li>
                    <li><span class="font-medium">Protected Areas:</span> 30% of land and marine areas to be designated as protected by 2030.</li>
                    <li><span class="font-medium">Circular Economy:</span> Mandatory waste reduction targets for manufacturers and retailers.</li>
                    <li><span class="font-medium">Environmental Impact Assessments:</span> Required for all development projects with stricter provisions for sensitive areas.</li>
                    <li><span class="font-medium">Compliance Reporting:</span> Annual environmental reports mandatory for entities with revenue over $10M.</li>
                    <li><span class="font-medium">Enforcement:</span> Graduated penalty system with fines from 1-5% of annual revenue.</li>
                    <li><span class="font-medium">Oversight:</span> Independent Environmental Oversight Committee established.</li>
                    <li><span class="font-medium">NGO Partnerships:</span> Framework for civil society involvement in Section 17.</li>
                </ul>`,
                actionItems: `<div class="space-y-4">
                    <div class="p-3 border-l-4 border-blue-500 bg-blue-50">
                        <h4 class="font-medium">Immediate Actions (0-6 months)</h4>
                        <ul class="list-disc pl-5 mt-2 text-sm">
                            <li>Register with the Environmental Compliance Portal by June 30, 2023</li>
                            <li>Designate an Environmental Compliance Officer within your organization</li>
                            <li>Review operations for alignment with new emission standards</li>
                        </ul>
                    </div>
                    
                    <div class="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                        <h4 class="font-medium">Mid-term Actions (6-18 months)</h4>
                        <ul class="list-disc pl-5 mt-2 text-sm">
                            <li>Submit first draft of Environmental Management Plan by December 2023</li>
                            <li>Implement waste reduction measures to meet 20% reduction target</li>
                            <li>Apply for available funding under Section 17 (Civil Society Partnerships)</li>
                        </ul>
                    </div>
                    
                    <div class="p-3 border-l-4 border-green-500 bg-green-50">
                        <h4 class="font-medium">Long-term Compliance (18+ months)</h4>
                        <ul class="list-disc pl-5 mt-2 text-sm">
                            <li>Develop and implement 5-year Carbon Reduction Roadmap</li>
                            <li>Establish community monitoring programs for local ecosystem protection</li>
                            <li>Prepare for biennial environmental audits starting January 2025</li>
                        </ul>
                    </div>
                </div>`,
                qa: `<div class="space-y-4">
                    <div class="p-4 bg-gray-50 rounded">
                        <div class="font-medium text-gray-800">What are the penalties for non-compliance?</div>
                        <p class="mt-2 text-gray-700">Non-compliance penalties follow a graduated system based on severity and intent. First-time minor violations receive warnings, while serious violations incur fines ranging from 1% to 5% of annual revenue. Repeated violations may result in operational restrictions or criminal charges for executives in cases of willful negligence.</p>
                    </div>
                    
                    <div class="p-4 bg-gray-50 rounded">
                        <div class="font-medium text-gray-800">How does this affect small businesses?</div>
                        <p class="mt-2 text-gray-700">Small businesses with annual revenue below $10 million have modified requirements. They are exempt from formal annual reporting but must still adhere to emission standards. Section 9.3 outlines a Small Business Adaptation Program offering technical assistance and phased implementation timelines. Micro-enterprises (under $2M revenue) have additional exemptions detailed in Appendix C.</p>
                    </div>
                    
                    <div class="p-4 bg-gray-50 rounded">
                        <div class="font-medium text-gray-800">What funding opportunities exist for NGOs?</div>
                        <p class="mt-2 text-gray-700">Section 17 establishes three funding streams for NGOs: (1) Environmental Monitoring Grants (up to $250,000), (2) Community Education Fund (up to $100,000), and (3) Conservation Partnership Program (up to $500,000 for multi-year projects). Applications open quarterly with simplified requirements for organizations with budgets under $1 million.</p>
                    </div>
                </div>`
            },
            references: `<div class="font-medium mb-1">Source References:</div>
                <ul class="list-disc list-inside space-y-1 text-gray-700">
                    <li>Carbon neutrality target: Section 4.2, Page 17</li>
                    <li>Environmental impact assessments: Section 8.5, Pages 43-46</li>
                    <li>Compliance reporting: Section 12.3, Pages 78-80</li>
                    <li>Civil society partnerships: Section 17, Pages 112-118</li>
                </ul>`
        },
        {
            title: "Human Rights Act.docx",
            type: "word",
            content: {
                summary: `<p class="mb-4">
                    The Human Rights Act of 2023 establishes a comprehensive legal framework for protecting fundamental human rights and freedoms. This legislation builds upon previous human rights laws while introducing new provisions to address emerging challenges in the digital age.
                </p>
                
                <p class="mb-4">
                    The Act recognizes and protects a broad spectrum of rights, including traditional civil liberties (freedom of expression, assembly, religion), socio-economic rights (adequate housing, healthcare, education), and newer digital rights (data privacy, digital access). It explicitly prohibits discrimination based on race, gender, religion, disability, age, sexual orientation, or socioeconomic status.
                </p>
                
                <p class="mb-4">
                    A key innovation is the establishment of the <span class="highlight">National Human Rights Commission</span> with enhanced investigative powers and the authority to issue binding directives to government agencies. The Commission can receive individual complaints, conduct suo moto investigations, and recommend remedial actions.
                </p>
                
                <p class="mb-4">
                    The Act introduces a <span class="highlight">mandatory human rights impact assessment</span> for all major policy decisions and development projects. Government agencies and large private entities must demonstrate that their activities will not adversely affect human rights, with special provisions for protecting vulnerable populations.
                </p>
                
                <p class="mb-4">
                    For NGOs, Section 24 is particularly relevant as it outlines a formal framework for civil society participation in human rights monitoring, reporting, and advocacy. It provides legal protection for human rights defenders and establishes channels for NGO input in policy formulation.
                </p>`,
                keyPoints: `<ul class="list-disc space-y-2 pl-5">
                    <li><span class="font-medium">Protected Rights:</span> Comprehensive coverage of civil, political, socio-economic, and digital rights.</li>
                    <li><span class="font-medium">Anti-Discrimination:</span> Broad protections against discrimination with enhanced penalties.</li>
                    <li><span class="font-medium">National Commission:</span> Independent body with investigative and enforcement powers.</li>
                    <li><span class="font-medium">Impact Assessments:</span> Mandatory for major policies and projects.</li>
                    <li><span class="font-medium">Judicial Review:</span> Expedited process for human rights violation cases.</li>
                    <li><span class="font-medium">Digital Rights:</span> New provisions for data privacy and digital access.</li>
                    <li><span class="font-medium">Remedies:</span> Expanded compensation framework for rights violations.</li>
                    <li><span class="font-medium">NGO Protections:</span> Legal safeguards for human rights defenders.</li>
                </ul>`,
                actionItems: `<div class="space-y-4">
                    <div class="p-3 border-l-4 border-blue-500 bg-blue-50">
                        <h4 class="font-medium">Immediate Actions (0-6 months)</h4>
                        <ul class="list-disc pl-5 mt-2 text-sm">
                            <li>Review organizational policies for compliance with expanded anti-discrimination provisions</li>
                            <li>Register with the National Human Rights Commission's NGO Partnership Portal</li>
                            <li>Designate internal Human Rights Officer(s) responsible for compliance</li>
                        </ul>
                    </div>
                    
                    <div class="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                        <h4 class="font-medium">Mid-term Actions (6-18 months)</h4>
                        <ul class="list-disc pl-5 mt-2 text-sm">
                            <li>Conduct staff training on human rights principles and reporting mechanisms</li>
                            <li>Establish protocols for human rights impact assessments in projects</li>
                            <li>Develop relationships with the regional offices of the Human Rights Commission</li>
                        </ul>
                    </div>
                    
                    <div class="p-3 border-l-4 border-green-500 bg-green-50">
                        <h4 class="font-medium">Long-term Implementation (18+ months)</h4>
                        <ul class="list-disc pl-5 mt-2 text-sm">
                            <li>Integrate human rights monitoring into regular program evaluations</li>
                            <li>Consider applying for official monitoring status under Section 24.3</li>
                            <li>Develop expertise in specific rights areas relevant to organizational mission</li>
                        </ul>
                    </div>
                </div>`,
                qa: `<div class="space-y-4">
                    <div class="p-4 bg-gray-50 rounded">
                        <div class="font-medium text-gray-800">How can individuals file complaints under this Act?</div>
                        <p class="mt-2 text-gray-700">Individuals can file complaints directly to the National Human Rights Commission through multiple channels: online portal, toll-free hotline (1-800-RIGHTS), physical offices in each district, or through registered NGO intermediaries. The process is designed to be accessible, with no filing fees and provisions for anonymous complaints in sensitive cases. Complaints must be acknowledged within 72 hours and initial assessment completed within 15 days.</p>
                    </div>
                    
                    <div class="p-4 bg-gray-50 rounded">
                        <div class="font-medium text-gray-800">What protections exist for human rights defenders?</div>
                        <p class="mt-2 text-gray-700">Section 24.5-24.8 provides specific protections for human rights defenders, including: legal immunity for good-faith reporting, expedited security provisions when threats are identified, confidentiality protections, anti-SLAPP provisions preventing retaliatory lawsuits, and a rapid response mechanism for emergency situations. The Act explicitly recognizes the legitimate role of human rights defenders in civil society.</p>
                    </div>
                    
                    <div class="p-4 bg-gray-50 rounded">
                        <div class="font-medium text-gray-800">How does the Act address digital rights?</div>
                        <p class="mt-2 text-gray-700">The Act introduces comprehensive digital rights in Section 15, including: right to internet access, data privacy protections, right to be forgotten, protections against algorithmic discrimination, digital identity safeguards, and provisions addressing surveillance limitations. It establishes a Digital Rights Advisory Panel to provide ongoing guidance as technologies evolve.</p>
                    </div>
                </div>`
            },
            references: `<div class="font-medium mb-1">Source References:</div>
                <ul class="list-disc list-inside space-y-1 text-gray-700">
                    <li>National Human Rights Commission: Section 8, Pages 22-34</li>
                    <li>Human rights impact assessments: Section 12, Pages 45-49</li>
                    <li>NGO framework: Section 24, Pages 87-93</li>
                    <li>Digital rights provisions: Section 15, Pages 62-68</li>
                </ul>`
        }
    ];
    
    // File upload via click
    uploadInput.addEventListener('change', function(e) {
        handleFileUpload(e.target.files);
    });
    
    // Drag and drop functionality
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add('border-blue-500');
    });
    
    dropZone.addEventListener('dragleave', function() {
        dropZone.classList.remove('border-blue-500');
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropZone.classList.remove('border-blue-500');
        
        if (e.dataTransfer.files) {
            handleFileUpload(e.dataTransfer.files);
        }
    });
    
    // Process button click
    processBtn.addEventListener('click', function() {
        processDocuments();
    });
    
    // Tab switching
    summaryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            summaryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update content based on tab
            const tabText = tab.textContent.trim();
            const currentDoc = sampleDocuments.find(doc => doc.title === documentTitle.textContent);
            
            if (currentDoc) {
                switch(tabText) {
                    case 'Summary':
                        summaryContent.innerHTML = currentDoc.content.summary;
                        break;
                    case 'Key Points':
                        summaryContent.innerHTML = currentDoc.content.keyPoints;
                        break;
                    case 'Action Items':
                        summaryContent.innerHTML = currentDoc.content.actionItems;
                        break;
                    case 'Q&A':
                        summaryContent.innerHTML = currentDoc.content.qa;
                        break;
                }
            }
        });
    });
    
    // Question submission
    questionBtn.addEventListener('click', function() {
        handleQuestion();
    });
    
    questionInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleQuestion();
        }
    });
    
    // Sample questions click
    sampleQuestions.forEach(question => {
        question.addEventListener('click', function() {
            questionInput.value = question.textContent.trim();
            handleQuestion();
        });
    });
    
    // Language dropdown
    languageBtn.addEventListener('click', function() {
        languageDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    window.addEventListener('click', function(e) {
        if (!languageBtn.contains(e.target)) {
            languageDropdown.classList.remove('show');
        }
    });
    
    // Language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', function() {
            languageBtn.querySelector('span').textContent = option.textContent;
            languageDropdown.classList.remove('show');
        });
    });
    
    // History & Settings buttons
    historyBtn.addEventListener('click', function() {
        alert('Document History feature coming soon!');
    });
    
    settingsBtn.addEventListener('click', function() {
        alert('Settings panel coming soon!');
    });
    
    // Document item actions (close button)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-times')) {
            const docItem = e.target.closest('.flex.items-center.justify-between');
            if (docItem) {
                docItem.remove();
            }
        }
    });
    
    // Functions
    function handleFileUpload(files) {
        Array.from(files).forEach(file => {
            const fileType = getFileType(file.name);
            addToQueue(file.name, fileType);
        });
    }
    
    function getFileType(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        if (extension === 'pdf') return 'pdf';
        if (['doc', 'docx'].includes(extension)) return 'word';
        return 'text';
    }
    
    function addToQueue(fileName, fileType) {
        const fileIcon = fileType === 'pdf' ? 'fa-file-pdf text-red-500' : 
                        fileType === 'word' ? 'fa-file-word text-blue-500' : 'fa-file-alt text-gray-500';
        
        const docElement = document.createElement('div');
        docElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded border';
        docElement.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${fileIcon} mr-2"></i>
                <span class="text-sm">${fileName}</span>
            </div>
            <div class="flex items-center">
                <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: 0%"></div>
                </div>
                <span class="text-xs text-gray-600 ml-2">0%</span>
                <button class="ml-2 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        uploadQueue.appendChild(docElement);
    }
    
    function processDocuments() {
        const documents = uploadQueue.querySelectorAll('.flex.items-center.justify-between');
        
        documents.forEach((doc, index) => {
            const progressBar = doc.querySelector('.bg-blue-600');
            const progressText = doc.querySelector('.text-xs.text-gray-600');
            const fileName = doc.querySelector('.text-sm').textContent;
            
            // Simulate processing with progress updates
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Update UI to show completed
                    doc.querySelector('.flex.items-center:last-child').innerHTML = `
                        <span class="text-xs text-green-600">Processed</span>
                        <button class="ml-2 text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    
                    // Load document summary if we have sample data
                    // For demonstration, we'll use the sample documents
                    const matchedDoc = sampleDocuments.find(d => d.title === fileName) || 
                                      (index === 0 ? sampleDocuments[0] : sampleDocuments[1]);
                    
                    if (matchedDoc) {
                        loadDocumentSummary(matchedDoc);
                    }
                }
                
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}%`;
            }, 500);
        });
    }
    
    function loadDocumentSummary(document) {
        // Update document title
        documentTitle.textContent = document.title;
        
        // Reset to summary tab
        summaryTabs.forEach(t => t.classList.remove('active'));
        summaryTabs[0].classList.add('active');
        
        // Update content
        summaryContent.innerHTML = document.content.summary;
        
        // Update references
        sourceReferences.innerHTML = document.references;
    }
    
    function handleQuestion() {
        const question = questionInput.value.trim();
        if (!question) return;
        
        // For demonstration purposes, switch to Q&A tab and show predefined answers
        summaryTabs.forEach(t => t.classList.remove('active'));
        summaryTabs[3].classList.add('active');
        
        const currentDoc = sampleDocuments.find(doc => doc.title === documentTitle.textContent) || sampleDocuments[0];
        summaryContent.innerHTML = currentDoc.content.qa;
        
        // Clear question input
        questionInput.value = '';
    }
    
    // Initialize with first sample document
    loadDocumentSummary(sampleDocuments[0]);
});