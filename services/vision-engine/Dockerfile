FROM ghcr.io/astral-sh/uv:python3.14-trixie-slim AS builder

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=services/vision-engine/pyproject.toml,target=services/vision-engine/pyproject.toml \
    uv sync --frozen --no-install-project --package vision-engine

# 2. Copy source, then install the project itself
COPY ./services/vision-engine/src/ /app/services/vision-engine/src/

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=services/vision-engine/pyproject.toml,target=services/vision-engine/pyproject.toml \
    uv sync --frozen --package vision-engine


ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

CMD ["/app/.venv/bin/vision-engine"]

