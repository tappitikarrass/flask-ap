"""create table token_blocklist

Revision ID: 1539601f0f02
Revises: 88fc12546ae3
Create Date: 2022-03-08 18:34:28.582220

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1539601f0f02'
down_revision = '88fc12546ae3'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "token_blocklist",
        sa.Column("token_id", sa.Integer, nullable=True, primary_key=True),
        sa.Column("jti", sa.String(36), nullable=False, unique=True),
        sa.Column("created_at", sa.DateTime, nullable=False, unique=False)
    )


def downgrade():
    op.drop_table("token_blocklist")
