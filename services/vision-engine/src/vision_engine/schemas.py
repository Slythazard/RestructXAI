from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any


@dataclass
class Node:
    id: str
    type: str
    subtype: str
    bbox: List[float] = field(default_factory=list)
    polygon: Optional[List[List[float]]] = None
    center: Optional[List[float]] = None
    area: Optional[float] = None

    text: Optional[str] = None
    tokens: Optional[List[str]] = None
    confidence: Optional[float] = None

    parent: Optional[str] = None
    children: List[str] = field(default_factory=list)

    properties: Dict[str, Any] = field(default_factory=dict)
    embedding: Optional[List[float]] = None


@dataclass
class Edge:
    source: str
    target: str
    type: str
    order_idx: Optional[int] = None
    weight: float = 1.0

    features: Dict[str, Any] = field(default_factory=dict)


@dataclass
class Page:
    page_id: str
    width: int
    height: int

    nodes: List[Node] = field(default_factory=list)
    edge: List[Edge] = field(default_factory=list)


@dataclass
class Document:
    doc_id: str
    metadata: Dict[str, Any]
    pages: List[Page] = field(default_factory=list)
