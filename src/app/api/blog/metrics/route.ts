import { NextResponse } from "next/server";
import connectDatabase from "@/lib/dbConnect";
import { BlogMetrics } from "@/lib/blog.model";

interface MongoDBError {
  code?: number;
  keyPattern?: Record<string, number>;
  keyValue?: Record<string, unknown>;
}

export async function POST(request: Request) {
  try {
    await connectDatabase("portfolio", process.env.MONGODB_URI);
    const { slug } = await request.json();
    console.log("Data in POST request:", { slug });

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    // Find or create metrics for this blog
    let metrics = await BlogMetrics.findOne({ slug });
    const now = new Date();

    if (!metrics) {
      try {
        metrics = await BlogMetrics.create({
          slug,
          views: 1,
          lastViewed: now,
          reactions: new Map()
        });
      } catch (error) {
        // Check if it's a MongoDB duplicate key error
        const mongoError = error as MongoDBError;
        if (mongoError.code === 11000) {
          metrics = await BlogMetrics.findOne({ slug });
          if (!metrics) {
            throw error; // If we still can't find it, something is wrong
          }
        } else {
          throw error;
        }
      }
    }

    if (!metrics) {
      return NextResponse.json(
        { error: 'Failed to create or find blog metrics' },
        { status: 500 }
      );
    }

    // Update existing metrics
    metrics.views += 1;
    metrics.lastViewed = now;
    await metrics.save();

    return NextResponse.json({
      success: true,
      metrics: {
        views: metrics.views,
        reactions: Object.fromEntries(metrics.reactions || new Map())
      }
    });

  } catch (error) {
    console.error('Error updating blog metrics:', error);
    return NextResponse.json(
      { error: 'Failed to update blog metrics' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDatabase("portfolio", process.env.MONGODB_URI);
    const url = new URL(request.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const metrics = await BlogMetrics.findOne({ slug });
    
    if (!metrics) {
      return NextResponse.json({
        success: true,
        metrics: {
          views: 0,
          lastViewed: null,
          reactions: {}
        }
      });
    }

    return NextResponse.json({
      success: true,
      metrics: {
        views: metrics.views,
        lastViewed: metrics.lastViewed,
        reactions: Object.fromEntries(metrics.reactions || new Map())
      }
    });
  } catch (error) {
    console.error('Error fetching blog metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog metrics' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDatabase("portfolio", process.env.MONGODB_URI);
    const { slug, emoji, action } = await request.json();

    if (!slug || !emoji || !action) {
      return NextResponse.json(
        { error: 'Slug, emoji, and action are required' },
        { status: 400 }
      );
    }

    if (!['add', 'remove'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "add" or "remove"' },
        { status: 400 }
      );
    }

    let metrics = await BlogMetrics.findOne({ slug });

    if (!metrics) {
      metrics = await BlogMetrics.create({
        slug,
        views: 0,
        lastViewed: new Date(),
        reactions: new Map([[emoji, 1]])
      });
    } else {
      const currentCount = metrics.reactions?.get(emoji) || 0;
      if (!metrics.reactions) {
        metrics.reactions = new Map();
      }
      metrics.reactions.set(emoji, action === 'add' ? currentCount + 1 : Math.max(0, currentCount - 1));
      await metrics.save();
    }

    return NextResponse.json({
      success: true,
      metrics: {
        views: metrics.views,
        lastViewed: metrics.lastViewed,
        reactions: Object.fromEntries(metrics.reactions || new Map())
      }
    });
  } catch (error) {
    console.error('Error updating reaction:', error);
    return NextResponse.json(
      { error: 'Failed to update reaction' },
      { status: 500 }
    );
  }
}
