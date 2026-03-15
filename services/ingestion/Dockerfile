FROM ghcr.io/astral-sh/uv:python3.14-trixie-slim AS builder

WORKDIR /app 

ENV UV_COMPILE_BYTECODE=1

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=services/ingestion/pyproject.toml,target=services/ingestion/pyproject.toml \
    uv sync --frozen --no-install-workspace --package ingestion

COPY ./services/ingestion/src/ /app/services/ingestion/src/
#     uv sync --locked

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=services/ingestion/pyproject.toml,target=services/ingestion/pyproject.toml \
    uv sync --frozen --package ingestion
#---------------------------------Final Stage Building------------------------------------------
# FROM ghcr.io/astral-sh/uv:python3.14-trixie-slim
#
# WORKDIR /app
#
# # COPY --from=builder /app/.venv /app/.venv
#
# COPY --from=builder /app /app
#
# RUN ls /app/.venv/bin/

ENV VIRTUAL_ENV=/app/.venv \
    PATH="/app/.venv/bin:$PATH"

CMD ["/app/.venv/bin/ingestion"]
# ENTRYPOINT ["ingestion"]
