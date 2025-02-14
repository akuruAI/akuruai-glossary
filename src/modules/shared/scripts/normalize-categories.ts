import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Database } from "../db/database.types";

dotenv.config();

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function normalizeCategories() {
  try {
    console.log("Starting category normalization...");

    // Fetch all unique categories using raw SQL
    const { data: uniqueCategories, error: fetchError } = await supabase
      .rpc("get_unique_categories");

    if (fetchError)
      throw fetchError;
    if (!uniqueCategories)
      throw new Error("No categories found");

    console.log(`Found ${uniqueCategories.length} unique categories`);

    // Insert categories and keep track of the mapping
    const categoryMapping: Record<string, number> = {};

    for (const { category } of uniqueCategories) {
      if (!category)
        continue;

      // Check if category already exists before inserting
      const { data: existingCategory, error: checkError } = await supabase
        .from("category")
        .select("id")
        .eq("name", category)
        .single();

      if (checkError && checkError.code !== "PGRST116") { // PGRST116 is "not found" error
        console.error(`Error checking category ${category}:`, checkError);
        continue;
      }

      if (existingCategory) {
        categoryMapping[category] = existingCategory.id;
        continue;
      }

      const { data: insertedCategory, error: insertError } = await supabase
        .from("category")
        .insert({ name: category })
        .select("id")
        .single();

      if (insertError) {
        console.error(`Error inserting category ${category}:`, insertError);
        continue;
      }

      if (insertedCategory) {
        categoryMapping[category] = insertedCategory.id;
      }
    }

    console.log("Categories inserted successfully");

    // Update words table with categoryId in batches
    let processedCount = 0;
    const batchSize = 1000;

    for (const category in categoryMapping) {
      const { error: updateError } = await supabase
        .from("words")
        .update({ categoryId: categoryMapping[category] })
        .eq("category", category);

      if (updateError) {
        console.error(`Error updating words for category ${category}:`, updateError);
        continue;
      }

      processedCount++;
      if (processedCount % batchSize === 0) {
        console.log(`Processed ${processedCount} categories...`);
      }
    }

    console.log("Category normalization completed successfully");
  }
  catch (error) {
    console.error("Error during category normalization:", error);
    process.exit(1);
  }
}

// Run the script
normalizeCategories();
