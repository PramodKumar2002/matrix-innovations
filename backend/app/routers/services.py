"""
Services Router for Matrix Innovations Backend.

Endpoint:
- GET /api/services: Returns the 6 core services offered by Matrix Innovations.

Content matches the official React frontend services portfolio:
1. Web Development
2. Software Development
3. IT Training
4. Robotics & AI
5. Digital Solutions
6. Career & Skill Development

Design:
Centralized static dataset for fast zero-latency responses without requiring database roundtrips.
"""

from typing import List, Optional
from fastapi import APIRouter, Query
from app.schemas import ServicesListResponse, ServiceItem

router = APIRouter(prefix="/api/services", tags=["Services"])

# Centralized Matrix Innovations Services Catalog
MATRIX_SERVICES: List[dict] = [
    {
        "id": "web-dev",
        "title": "Web Development",
        "desc": "High-speed, responsive web applications, modern Single Page Applications (SPAs), and robust full-stack platforms engineered with React and cutting-edge web technologies.",
        "tags": [
            "React.js & Next.js",
            "Responsive UI/UX",
            "REST & GraphQL",
            "SEO & Performance"
        ],
        "color": "#06B6D4",
        "glow": "rgba(6, 182, 212, 0.25)"
    },
    {
        "id": "software-dev",
        "title": "Software Development",
        "desc": "Bespoke enterprise software, scalable cloud microservices, database management, and custom business tools designed to automate and elevate your workflow.",
        "tags": [
            "Custom Architecture",
            "Cloud Microservices",
            "Secure APIs",
            "Database Optimization"
        ],
        "color": "#3B82F6",
        "glow": "rgba(59, 130, 246, 0.25)"
    },
    {
        "id": "it-training",
        "title": "IT Training",
        "desc": "Practical, industry-aligned training programs in full-stack development, modern programming languages, and cloud systems with real-world project portfolios.",
        "tags": [
            "Hands-On Projects",
            "Industry Mentorship",
            "Live Coding Labs",
            "Recognized Certification"
        ],
        "color": "#10B981",
        "glow": "rgba(16, 185, 129, 0.25)"
    },
    {
        "id": "robotics-ai",
        "title": "Robotics & AI",
        "desc": "Applied robotics workshops, microcontrollers, embedded IoT hardware, sensor telemetry, computer vision, and Machine Learning model integration.",
        "tags": [
            "ROS & Microcontrollers",
            "Applied Machine Learning",
            "Computer Vision",
            "IoT Prototyping"
        ],
        "color": "#8B5CF6",
        "glow": "rgba(139, 92, 246, 0.25)"
    },
    {
        "id": "digital-solutions",
        "title": "Digital Solutions",
        "desc": "End-to-end digital transformation consulting, cloud infrastructure migration, modern user interfaces, and automated business tools to accelerate digital readiness.",
        "tags": [
            "Cloud Migration",
            "Digital Transformation",
            "UI/UX Design Systems",
            "Workflow Automation"
        ],
        "color": "#F59E0B",
        "glow": "rgba(245, 158, 11, 0.25)"
    },
    {
        "id": "career-dev",
        "title": "Career & Skill Development",
        "desc": "Comprehensive career roadmaps, technical interview preparation, personalized 1-on-1 mentorship, resume reviews, and industry placement assistance.",
        "tags": [
            "Interview Coaching",
            "Portfolio Curation",
            "Resume Optimization",
            "Placement Assistance"
        ],
        "color": "#EC4899",
        "glow": "rgba(236, 72, 153, 0.25)"
    }
]


@router.get(
    "",
    response_model=ServicesListResponse,
    summary="List Matrix Innovations Services",
    description="Returns the catalog of engineering and educational services offered by Matrix Innovations."
)
async def get_services(
    search: Optional[str] = Query(default=None, description="Optional text filter for service title or tags")
):
    """
    Retrieves the complete list of company services.
    Supports optional case-insensitive text search.
    """
    if not search:
        return ServicesListResponse(
            success=True,
            services=[ServiceItem(**s) for s in MATRIX_SERVICES]
        )

    query = search.strip().lower()
    filtered = [
        s for s in MATRIX_SERVICES
        if query in s["title"].lower() or any(query in tag.lower() for tag in s["tags"])
    ]

    return ServicesListResponse(
        success=True,
        services=[ServiceItem(**s) for s in filtered]
    )
