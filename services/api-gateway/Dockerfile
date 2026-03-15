FROM ghcr.io/astral-sh/uv:python3.14-trixie-slim AS builder

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=services/api-gateway/pyproject.toml,target=api-gateway/pyproject.toml \
    uv sync --frozen --no-install-project --package api-gateway

# 2. Copy source, then install the project itself
COPY ./services/api-gateway/src/ /app/services/api-gateway/src/
# COPY ./services/api-gateway/src/README.md /app/services/api-gateway/src/README.md

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=services/api-gateway/pyproject.toml,target=services/api-gateway/pyproject.toml \
    uv sync --frozen --package api-gateway

# # ── Final Stage ───────────────────────────────────────────────────────────────
# FROM ghcr.io/astral-sh/uv:python3.14-trixie-slim
#
# WORKDIR /app
#
# COPY --from=builder /app/.venv /app/.venv
# COPY --from=builder /app/services/api-gateway/src /app/services/api-gateway/src

ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

CMD ["/app/.venv/bin/api-gateway"]

